import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../lib/reducers/modal-slice";

export default function useSendWhatsAppMessage(inquiry) {
  const router = useRouter();

  const [_inquiry, _setInquiry] = useState(inquiry);

  const dispatch = useDispatch();

  const sendWhatsappMessage = (mobile_number) => {
    const api_url = "https://api.whatsapp.com/send/";
    const phone = mobile_number;
    const text = encodeURIComponent(_inquiry);

    const button_url = `${api_url}?phone=${phone}&text=${text}`;

    router.push(button_url);
  };

  const handleSendWhatsAppMessage = (mobile_number) => {
    dispatch(
      openModal({
        title: "Send Inquiry",
        message:
          "Are you sure you want to send the inquiry? You will be redirected to different website",
        handleClick: () => sendWhatsappMessage(mobile_number),
        okButtonText: "Okay",
      })
    );
  };

  return [_inquiry, _setInquiry, handleSendWhatsAppMessage];
}
