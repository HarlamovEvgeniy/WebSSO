import { useRouter } from "next/router";
import Image from 'next/image';

export const QRCodeReload = () => {
  const router = useRouter();
  const handle = () => {
    router.reload();
  }

  return(
    <>
      <div className="code__missing">
        <Image alt="QR code no longer valid" width={"285px"} height={"285px"} src={'/QRCode.svg'}/>
      </div>
    </>
  );
}

export default QRCodeReload;