import type { APIRoute } from 'astro';
import { getAuth } from 'firebase-admin/auth';
import { app } from '../../../firebase/server';

export const POST: APIRoute = async ({ request }) => {
  const { email, password } = await request.json();

  const auth = getAuth(app);

  try {
    // Crear un nuevo usuario con email y contraseña
    await auth.createUser({
      email,
      password,
      displayName: email,
    });
    return new Response(
      JSON.stringify({
        message: 'Usuario creado con éxito',
      }),
      { status: 201 }
    );
  } catch (error: any) {
    // Manejo de errores
    return new Response(error.message, { status: 400 });
  }
};
