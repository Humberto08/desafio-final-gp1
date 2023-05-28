// declare namespace Express {
//   export interface Request {
//     user: string;
//   }
// }


declare global {
  namespace Express {
      interface Request{
          user: { id }
      }
  }
}