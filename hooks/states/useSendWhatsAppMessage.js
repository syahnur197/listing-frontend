import { useRouter } from "next/router";
import { useState } from "react";

export default function useSendWhatsAppMessage(inquiry) {
  const router = useRouter();

  const [_inquiry, _setInquiry] = useState(inquiry);

  const sendWhatsappMessage = (mobile_number) => {
    const api_url = "https://api.whatsapp.com/send/";
    const phone = mobile_number;
    const text = encodeURIComponent(_inquiry);

    const button_url = `${api_url}?phone=${phone}&text=${text}`;

    router.push(button_url);
  };

  return [_inquiry, _setInquiry, sendWhatsappMessage];
}
