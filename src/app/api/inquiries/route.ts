import { NextResponse } from "next/server";
import { ContactInquiryPayload } from "@/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactInquiryPayload>;

    const contactName = (body.contactName || "").trim();
    const email = (body.email || "").trim();
    const phone = (body.phone || "").trim();
    const message = (body.message || "").trim();

    const errors: Record<string, string> = {};

    if (!contactName || contactName.length < 2) {
      errors.contactName = "Vui lòng nhập họ tên người liên hệ (tối thiểu 2 ký tự).";
    }

    if (!phone && !email) {
      errors.contactMethod =
        "Vui lòng cung cấp ít nhất Số điện thoại hoặc Email để Sunflower phản hồi báo giá.";
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Định dạng địa chỉ Email chưa hợp lệ.";
    }

    if (phone && !/^[0-9+\-\s().]{8,16}$/.test(phone)) {
      errors.phone = "Số điện thoại chưa đúng định dạng (8–16 ký tự số).";
    }

    if (!message || message.length < 10) {
      errors.message =
        "Vui lòng mô tả quy cách hoặc nhu cầu cụ thể (tối thiểu 10 ký tự).";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          ok: false,
          message: "Vui lòng kiểm tra lại các trường thông tin chưa hợp lệ.",
          errors,
        },
        { status: 400 }
      );
    }

    // Check whether real SMTP/Webhook destination is configured in environment variables
    const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;
    const referenceCode = `SF-${new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

    if (webhookUrl) {
      const forwardRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referenceCode,
          submittedAt: new Date().toISOString(),
          payload: body,
        }),
      });

      if (!forwardRes.ok) {
        return NextResponse.json(
          {
            ok: false,
            message:
              "Hệ thống tiếp nhận đang bận. Vui lòng thử lại hoặc sao chép thông số gửi trực tiếp qua Email.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json({
        ok: true,
        deliveryMode: "live_webhook" as const,
        referenceCode,
        submittedAt: new Date().toISOString(),
        message:
          "Yêu cầu báo giá đã được chuyển tới bộ phận Kinh doanh & Kỹ thuật của Sunflower.",
      });
    }

    // Truthful Demo / Staging Validation Mode when SMTP/Webhook credentials are not yet configured
    return NextResponse.json({
      ok: true,
      deliveryMode: "staging_validated" as const,
      referenceCode,
      submittedAt: new Date().toISOString(),
      message:
        "Thông số yêu cầu báo giá đã được kiểm tra hợp lệ và tạo phiếu tóm tắt. (Lưu ý môi trường Preview: Kết nối SMTP/Email thực tế sẽ được kích hoạt ngay khi Sunflower cung cấp hộp thư nhận báo giá chính thức).",
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Không thể xử lý dữ liệu biểu mẫu. Vui lòng kiểm tra lại định dạng gửi lên.",
      },
      { status: 400 }
    );
  }
}
