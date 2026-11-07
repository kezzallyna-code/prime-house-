#!/usr/bin/env node

/**
 * Prime House - Administrator Account Management CLI
 * Usage:
 *   node scripts/manage_admin.js list
 *   node scripts/manage_admin.js reset-password <email> <newPassword>
 *   node scripts/manage_admin.js create <email> <password> <fullName> [role]
 */

try {
  process.loadEnvFile('.env');
} catch (e) {
  // If .env missing or already in process.env
}

import { getSupabaseAdmin } from '../lib/supabase-server.js';
import { hashPassword } from '../lib/auth.js';

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';

  const supabase = getSupabaseAdmin();

  if (command === 'list') {
    const { data: admins, error } = await supabase
      .from('admin_users')
      .select('id, email, full_name, role, is_active, last_login_at, created_at')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error listing admins:', error.message);
      process.exit(1);
    }

    console.log('\n=== PRIME HOUSE ADMINISTRATORS ===');
    console.table(admins);
    return;
  }

  if (command === 'reset-password') {
    const email = args[1];
    const newPassword = args[2];

    if (!email || !newPassword) {
      console.error('Usage: node scripts/manage_admin.js reset-password <email> <newPassword>');
      process.exit(1);
    }

    if (newPassword.length < 8) {
      console.error('Error: New password must be at least 8 characters long.');
      process.exit(1);
    }

    const { data: user, error: fetchErr } = await supabase
      .from('admin_users')
      .select('id, email, full_name')
      .eq('email', email.trim().toLowerCase())
      .single();

    if (fetchErr || !user) {
      console.error(`Error: User with email "${email}" not found.`);
      process.exit(1);
    }

    const newHash = hashPassword(newPassword);
    const { error: updateErr } = await supabase
      .from('admin_users')
      .update({
        password_hash: newHash,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (updateErr) {
      console.error('Error updating password:', updateErr.message);
      process.exit(1);
    }

    console.log(`\n[SUCCESS] Password for ${user.email} (${user.full_name}) successfully updated using PBKDF2-SHA512.\n`);
    return;
  }

  if (command === 'create') {
    const email = args[1];
    const password = args[2];
    const fullName = args[3];
    const role = args[4] || 'moderator';

    if (!email || !password || !fullName) {
      console.error('Usage: node scripts/manage_admin.js create <email> <password> <fullName> [role]');
      process.exit(1);
    }

    const newHash = hashPassword(password);
    const { data: newUser, error: createErr } = await supabase
      .from('admin_users')
      .insert([{
        email: email.trim().toLowerCase(),
        password_hash: newHash,
        full_name: fullName.trim(),
        role,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (createErr) {
      console.error('Error creating admin:', createErr.message);
      process.exit(1);
    }

    console.log(`\n[SUCCESS] Admin account created: ${newUser.email} (${newUser.role})\n`);
    return;
  }

  console.log(`
Prime House Admin Management CLI
Commands:
  node scripts/manage_admin.js list
  node scripts/manage_admin.js reset-password <email> <newPassword>
  node scripts/manage_admin.js create <email> <password> <fullName> [role]
  `);
}

main().catch(err => {
  console.error('Unexpected CLI error:', err);
  process.exit(1);
});
