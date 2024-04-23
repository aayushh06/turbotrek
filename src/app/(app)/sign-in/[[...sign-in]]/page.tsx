import Centered from "@/components/global/Centered";
import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return <Centered><SignIn /></Centered>;
}