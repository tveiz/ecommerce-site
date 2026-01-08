import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseClient';
import { sendDiscordLog, createAccountEmbed } from '@/lib/discordLogger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, username, photo_url } = body;
    
    // Verificar se é o email do admin
    const isAdminEmail = email === 'tm9034156@gmail.com';
    
    // Criar usuário no Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (authError) throw authError;

    const userId = authData.user.id;
    const hwid = `HWID-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Criar perfil do usuário
    const { error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .insert([{
        id: userId,
        email,
        username: isAdminEmail ? 'adm00' : username,
        photo_url: isAdminEmail ? '/admin-avatar.png' : photo_url,
        is_admin: isAdminEmail,
        is_attendant: false,
        hwid,
      }]);

    if (profileError) throw profileError;

    // Não enviar logs se for admin
    if (!isAdminEmail) {
      const ip = request.headers.get('x-forwarded-for') || 'unknown';
      const embed = createAccountEmbed(
        { id: userId, email, username, photo_url, is_admin: false },
        ip,
        hwid
      );
      
      await sendDiscordLog(
        process.env.DISCORD_WEBHOOK_URL_LOGS_CONTAS!,
        embed
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Conta criada com sucesso!',
      user: {
        id: userId,
        email,
        username: isAdminEmail ? 'adm00' : username,
        is_admin: isAdminEmail,
      }
    });

  } catch (error: any) {
    console.error('Erro no registro:', error);
    return NextResponse.json(
      { error: error.message || 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
