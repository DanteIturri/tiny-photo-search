import type { APIRoute } from 'astro';
import { getAuth , signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../../firebase/client';

export const POST: APIRoute = async ({ request }) => {
  const { email, password } = await request.json();

  const auth = getAuth(app);

  try {
    // Iniciar sesión con email y contraseña
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    // Manejo de errores
    return new Response(error.message, { status: 400 });
  }
  return new Response('Login successful', { status: 200 });
};
