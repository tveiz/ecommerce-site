import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      user: data.user,
      session: data.session 
    });

  } catch (error: any) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { error: error.message || 'Credenciais inválidas' },
      { status: 401 }
    );
  }
}
