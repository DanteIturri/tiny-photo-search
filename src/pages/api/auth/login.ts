import type { APIRoute } from 'astro';
import { getAuth , signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../../firebase/client';

export const POST: APIRoute = async ({ request }) => {
  const { email, password } = await request.json();

  const auth = getAuth(app);
  return new Response('Login successful', { status: 200 });
}
;