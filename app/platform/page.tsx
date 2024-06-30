import { title } from "@/components/primitives";
import { createDocument } from "@/services/firebase/database/queries";


export default async function AboutPage() {
  await createDocument({'data':'data'});
  return (
    <div>
      <h1 className={title()}>About</h1>
    </div>
  );
}
