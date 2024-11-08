import type { APIRoute } from 'astro';
import { getAuth} from 'firebase-admin/auth';
import { app } from '../../../firebase/server';




export const GET: APIRoute = async ({ request }) => {
   const auth = getAuth(app);
   const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];
 
   if (!idToken) {
     return new Response("Token no encontrado", { status: 401 });
   }
 
   try {
   await auth.verifyIdToken(idToken);
     return new Response(JSON.stringify({ message: "Token válido" }), { status: 200 });
   } catch (error) {
     return new Response("Token inválido", { status: 401 });
   }
}