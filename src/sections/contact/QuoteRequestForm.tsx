"use client";

import { EditorialDetails } from "@/components/ui/EditorialDetails";
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCT_CATEGORIES } from "@/content/products";
import { SOLUTIONS_LIST } from "@/content/solutions";
import { PROJECTS_LIST } from "@/content/projects";
import { COMPANY_INFO } from "@/content/company";
import { ContactInquiryPayload, InquiryPurpose } from "@/types";
import { CheckCircle2, Copy, AlertCircle, Send } from "lucide-react";

const PURPOSE_OPTIONS: { id: InquiryPurpose; label: string; desc: string }[] = [
  {
    id: "quote",
    label: "Yêu cầu báo giá sản xuất / vật tư",
    desc: "Đã có nhóm sản phẩm hoặc quy cách kích thước, số lượng dự kiến.",
  },
  {
    id: "consultation",
    label: "Tư vấn chọn chất liệu & giải pháp",
    desc: "Cần tư vấn tổ hợp mặt – keo – mực in phù hợp bề mặt dán thực tế.",
  },
  {
    id: "partnership",
    label: "Hợp tác cung ứng B2B định kỳ",
    desc: "Cung cấp vật tư theo tháng/quý hoặc đăng ký nhận Hồ sơ năng lực / Mẫu thử.",
  },
  {
    id: "other",
    label: "Yêu cầu khác",
    desc: "Trao đổi thông tin kỹ thuật, lịch giao hàng hoặc chứng từ.",
  },
];

const B2B_ORDERING_FAQS = [
  {
    q: "Chưa biết chính xác tên chất liệu decal thì gửi yêu cầu báo giá như thế nào?",
    a: "Quý doanh nghiệp chỉ cần mô tả bề mặt dán (thùng carton, chai nhựa, lọ thủy tinh, linh kiện điện tử...) và điều kiện bảo quản (nhiệt độ phòng, kho lạnh, ngoài trời). Đội ngũ kỹ thuật của Sunflower sẽ đề xuất 1–2 phương án chất liệu tối ưu kèm mẫu thử.",
  },
  {
    q: "Sunflower có nhận bế kích thước tem riêng theo máy in của nhà máy không?",
    a: "Có. Bên cạnh các khổ tem tiêu chuẩn, Sunflower gia công khuôn bế theo đúng kích thước ngang × dọc, số tem trên một hàng, đường kính lõi (25mm / 38mm / 76mm) và chiều quấn tem tương thích với máy in/máy dán của khách hàng.",
  },
  {
    q: "Có thể đặt đồng thời cả tem nhãn cuộn và mực in Ribbon tương thích không?",
    a: "Hoàn toàn được. Việc đặt đồng bộ phôi decal cuộn và cuộn mực in Ribbon (Wax, Wax/Resin hoặc Resin) giúp đảm bảo độ bám mực tối đa và tránh hao mòn đầu in nhiệt.",
  },
];

export function QuoteRequestForm() {
  const searchParams = useSearchParams();
  const paramProduct = searchParams.get("san-pham") || "";
  const paramSolution = searchParams.get("nhu-cau") || "";
  const paramProject = searchParams.get("du-an") || "";

  const [purpose, setPurpose] = useState<InquiryPurpose>("quote");
  const [contactName, setContactName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [productSlug, setProductSlug] = useState(paramProduct);
  const [solutionSlug, setSolutionSlug] = useState(paramSolution);
  const [projectSlug, setProjectSlug] = useState(paramProject);
  const [dimensions, setDimensions] = useState("");
  const [quantity, setQuantity] = useState("");
  const [materialPreference, setMaterialPreference] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("Hà Nội");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    ok: boolean;
    deliveryMode?: "live_webhook" | "staging_validated";
    referenceCode?: string;
    submittedAt?: string;
    message: string;
  } | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Sync URL query params into form state when user navigates with ?san-pham=, ?nhu-cau=, ?du-an=
  useEffect(() => {
    if (paramProduct) {
      setProductSlug(paramProduct);
      setPurpose("quote");
    }
    if (paramSolution) {
      setSolutionSlug(paramSolution);
      if (
        paramSolution === "ho-so-nang-luc" ||
        paramSolution === "nhan-mau-thu" ||
        paramSolution === "hop-tac"
      ) {
        setPurpose("partnership");
      } else {
        setPurpose("consultation");
      }
    }
    if (paramProject) {
      setProjectSlug(paramProject);
      setPurpose("quote");
    }
  }, [paramProduct, paramSolution, paramProject]);

  const selectedProduct = useMemo(
    () => PRODUCT_CATEGORIES.find((p) => p.slug === productSlug),
    [productSlug]
  );

  const selectedSolution = useMemo(
    () => SOLUTIONS_LIST.find((s) => s.slug === solutionSlug),
    [solutionSlug]
  );

  const selectedProject = useMemo(
    () => PROJECTS_LIST.find((p) => p.slug === projectSlug),
    [projectSlug]
  );

  // Auto-populate helpful message template if message is still empty and special nhu-cau was passed
  useEffect(() => {
    if (message.trim().length > 0) return;
    if (paramSolution === "ho-so-nang-luc") {
      setMessage(
        "Đề nghị gửi bộ Hồ sơ năng lực (Company Profile) và danh mục 13 nhóm sản phẩm của Sunflower qua Email để lưu hồ sơ nhà cung cấp."
      );
    } else if (paramSolution === "nhan-mau-thu") {
      setMessage(
        "Đề nghị gửi Bộ mẫu vật liệu thực tế (Sample Kit: decal giấy, PP/PVC, mực in Ribbon, nhãn vải) để bộ phận kỹ thuật kiểm tra độ bám dính."
      );
    }
  }, [paramSolution, message]);

  const formattedSpecSummary = useMemo(() => {
    const lines = [
      `=== YÊU CẦU BÁO GIÁ & TƯ VẤN KỸ THUẬT — SUNFLOWER ===`,
       submitResult?.referenceCode
        ? `Mã tham chiếu: ${submitResult.referenceCode}`
        : null,
      `Mục đích: ${
        PURPOSE_OPTIONS.find((o) => o.id === purpose)?.label || purpose
      }`,
      `Người liên hệ: ${contactName || "(Chưa nhập)"}`,
      `Doanh nghiệp: ${company || "(Chưa nhập)"}`,
      `Điện thoại: ${phone || "(Chưa nhập)"}`,
      `Email: ${email || "(Chưa nhập)"}`,
      selectedProduct
        ? `Nhóm sản phẩm: ${selectedProduct.id}. ${selectedProduct.name}`
        : null,
      selectedSolution
        ? `Giải pháp quan tâm: ${selectedSolution.title}`
        : null,
      selectedProject ? `Mẫu quy cách tham chiếu: ${selectedProject.title}` : null,
      dimensions ? `Kích thước / Quy cách: ${dimensions}` : null,
      quantity ? `Số lượng dự kiến: ${quantity}` : null,
      materialPreference
        ? `Chất liệu / Môi trường dán: ${materialPreference}`
        : null,
      deliveryLocation ? `Khu vực giao hàng: ${deliveryLocation}` : null,
      `Nội dung chi tiết: ${message || "(Chưa nhập)"}`,
    ].filter(Boolean);
    return lines.join("\n");
  }, [
    submitResult?.referenceCode,
    purpose,
    contactName,
    company,
    phone,
    email,
    selectedProduct,
    selectedSolution,
    selectedProject,
    dimensions,
    quantity,
    materialPreference,
    deliveryLocation,
    message,
  ]);

  const validateClient = () => {
    const nextErrors: Record<string, string> = {};
    if (!contactName.trim() || contactName.trim().length < 2) {
      nextErrors.contactName =
        "Vui lòng nhập họ tên người liên hệ (tối thiểu 2 ký tự).";
    }
    if (!phone.trim() && !email.trim()) {
      nextErrors.contactMethod =
        "Vui lòng nhập ít nhất Số điện thoại hoặc Email để nhận phản hồi báo giá.";
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Địa chỉ Email chưa đúng định dạng.";
    }
    if (phone.trim() && !/^[0-9+\-\s().]{8,16}$/.test(phone.trim())) {
      nextErrors.phone = "Số điện thoại cần từ 8–16 ký tự số.";
    }
    if (!message.trim() || message.trim().length < 10) {
      nextErrors.message =
        "Vui lòng mô tả quy cách hoặc nhu cầu cụ thể (tối thiểu 10 ký tự).";
    }
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      requestAnimationFrame(() => document.getElementById(firstInvalid === "contactMethod" ? "phone" : firstInvalid)?.focus());
    }
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitResult(null);

    if (!validateClient()) return;

    setIsSubmitting(true);
    try {
      const payload: ContactInquiryPayload = {
        purpose,
        contactName: contactName.trim(),
        company: company.trim() || undefined,
        phone: phone.trim() || undefined,
        email: email.trim() || undefined,
        productSlug: productSlug || undefined,
        solutionSlug: solutionSlug || undefined,
        projectSlug: projectSlug || undefined,
        dimensions: dimensions.trim() || undefined,
        quantity: quantity.trim() || undefined,
        materialPreference: materialPreference.trim() || undefined,
        deliveryLocation: deliveryLocation.trim() || undefined,
        message: message.trim(),
      };

      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        setSubmitResult({
          ok: false,
          message:
            data.message || "Vui lòng kiểm tra lại các thông tin bắt buộc.",
        });
      } else {
        setErrors({});
        setSubmitResult({
          ok: true,
          deliveryMode: data.deliveryMode,
          referenceCode: data.referenceCode,
          submittedAt: data.submittedAt,
          message: data.message,
        });
      }
    } catch {
      setSubmitResult({
        ok: false,
        message:
          "Không thể kết nối máy chủ kiểm tra. Bạn có thể sao chép bảng thông số bên dưới để gửi trực tiếp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(formattedSpecSummary);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    } catch {
      // Fallback if clipboard API blocked
    }
  };

  return (
    <section
      aria-label="Biểu mẫu yêu cầu báo giá và thông tin liên hệ B2B"
      className="contact-content section-spacing border-b border-border bg-background"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* RIGHT COLUMN (7/12): Smart Context-Aware Quote Request Form */}
          <div id="quote-form-panel" role="region" aria-labelledby="quote-request-heading" className="lg:order-2 lg:col-span-7">
            <div className="border border-border bg-background-pure p-6 md:p-10">
              <div className="border-b border-border pb-6">
                <p className="eyebrow">PHIẾU YÊU CẦU BÁO GIÁ & TƯ VẤN KỸ THUẬT</p>
                <h2 id="quote-request-heading" className="heading-h3 mt-2 text-foreground">
                  Bạn đang cần quy cách nào?
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Điền thông số dự kiến; danh mục từ trang trước được chọn sẵn.
                  Bản demo chỉ kiểm tra và tạo tóm tắt, chưa gửi yêu cầu đến Sunflower.
                </p>

                {/* Active URL Context Banner */}
                {(selectedProduct || selectedSolution || selectedProject) && (
                  <div className="mt-4 rounded-sm border border-accent/60 bg-surface/70 p-3.5 text-xs">
                    <p className="font-mono font-semibold uppercase tracking-wider text-foreground">
                      Ngữ cảnh đang chọn tự động:
                    </p>
                    <ul className="mt-1.5 space-y-1 text-foreground-soft">
                      {selectedProduct && (
                        <li>
                          • Nhóm sản phẩm:{" "}
                          <strong>
                            {selectedProduct.id}. {selectedProduct.name}
                          </strong>
                        </li>
                      )}
                      {selectedSolution && (
                        <li>
                          • Giải pháp ngành:{" "}
                          <strong>{selectedSolution.title}</strong>
                        </li>
                      )}
                      {selectedProject && (
                        <li>
                          • Hồ sơ quy cách tham chiếu:{" "}
                          <strong>{selectedProject.title}</strong>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-6">
                {/* 1. Purpose Selection */}
                <fieldset>
                  <legend className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    1. Mục đích liên hệ *
                  </legend>
                  <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {PURPOSE_OPTIONS.map((opt) => {
                      const active = purpose === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setPurpose(opt.id)}
                          className={`rounded border p-3.5 text-left transition-colors ${
                            active
                              ? "border-foreground bg-surface"
                              : "border-border bg-background hover:border-foreground/50"
                          }`}
                        >
                          <p className="text-xs font-semibold text-foreground">
                            {opt.label}
                          </p>
                          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                            {opt.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* 2. Buyer Contact Information */}
                <div className="grid grid-cols-1 gap-5 border-t border-border pt-6 sm:grid-cols-2">
                  <p className="text-xs leading-relaxed text-muted-foreground sm:col-span-2">Điền họ tên và ít nhất một cách liên hệ: số điện thoại hoặc email.</p>
                  <div>
                    <label
                      htmlFor="contactName"
                      className="block text-xs font-semibold text-foreground"
                    >
                      Họ và tên người liên hệ *
                    </label>
                    <input
                      id="contactName"
                      autoComplete="name"
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="VD: Nguyễn Văn A"
                      aria-invalid={Boolean(errors.contactName)}
                      aria-describedby={errors.contactName ? "contactName-error" : undefined}
                      className="mt-1.5 w-full rounded-btn border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none"
                    />
                    {errors.contactName && (
                      <p id="contactName-error" role="alert" className="mt-1 text-xs text-error">
                        {errors.contactName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-xs font-semibold text-foreground"
                    >
                      Tên công ty / Nhà máy / Xưởng
                    </label>
                    <input
                      id="company"
                      autoComplete="organization"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="VD: Công ty TNHH Sản xuất ABC"
                      className="mt-1.5 w-full rounded-btn border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold text-foreground"
                    >
                      Số điện thoại / Zalo
                    </label>
                    <input
                      id="phone"
                      autoComplete="tel"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="VD: 0912 345 678"
                      aria-invalid={Boolean(errors.phone || errors.contactMethod)}
                      aria-describedby={errors.phone ? "phone-error" : errors.contactMethod ? "contactMethod-error" : undefined}
                      className="mt-1.5 w-full rounded-btn border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none"
                    />
                    {errors.phone && (
                      <p id="phone-error" role="alert" className="mt-1 text-xs text-error">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-foreground"
                    >
                      Email doanh nghiệp
                    </label>
                    <input
                      id="email"
                      autoComplete="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="VD: mua-hang@doanhnghiep.vn"
                      aria-invalid={Boolean(errors.email || errors.contactMethod)}
                      aria-describedby={errors.email ? "email-error" : errors.contactMethod ? "contactMethod-error" : undefined}
                      className="mt-1.5 w-full rounded-btn border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none"
                    />
                    {errors.email && (
                      <p id="email-error" role="alert" className="mt-1 text-xs text-error">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {errors.contactMethod && (
                    <div className="sm:col-span-2">
                      <p id="contactMethod-error" role="alert" className="text-xs font-medium text-error">
                        {errors.contactMethod}
                      </p>
                    </div>
                  )}
                </div>

                {/* 3. Product Category & Technical Specifications */}
                <div className="space-y-5 border-t border-border pt-6">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="productSlug"
                        className="block text-xs font-semibold text-foreground"
                      >
                        Nhóm sản phẩm quan tâm (13 nhóm cấp 1)
                      </label>
                      <select
                        id="productSlug"
                        value={productSlug}
                        onChange={(e) => setProductSlug(e.target.value)}
                        className="mt-1.5 w-full rounded-btn border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-foreground focus:outline-none"
                      >
                        <option value="">-- Chọn nhóm sản phẩm (Tuỳ chọn) --</option>
                        {PRODUCT_CATEGORIES.map((prod) => (
                          <option key={prod.slug} value={prod.slug}>
                            {prod.id < 10 ? `0${prod.id}` : prod.id}. {prod.name} (
                            {prod.familyName})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="solutionSlug"
                        className="block text-xs font-semibold text-foreground"
                      >
                        Hoặc chọn theo ngành / nhu cầu ứng dụng
                      </label>
                      <select
                        id="solutionSlug"
                        value={solutionSlug}
                        onChange={(e) => setSolutionSlug(e.target.value)}
                        className="mt-1.5 w-full rounded-btn border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-foreground focus:outline-none"
                      >
                        <option value="">-- Chọn giải pháp ngành (Tuỳ chọn) --</option>
                        {SOLUTIONS_LIST.map((sol) => (
                          <option key={sol.slug} value={sol.slug}>
                            {sol.index}. {sol.title}
                          </option>
                        ))}
                        <option value="ho-so-nang-luc">
                          Nhận Hồ sơ năng lực (Company Profile)
                        </option>
                        <option value="nhan-mau-thu">
                          Nhận Bộ mẫu vật liệu thực tế (Sample Kit)
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Dynamic Quote Fields Helper for Selected Product Category */}
                  {selectedProduct && (
                    <div className="rounded-sm border border-border bg-surface/65 p-4">
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground">
                        Gợi ý thông số cho nhóm [{selectedProduct.name}]:
                      </p>
                      <ul className="mt-2 grid grid-cols-1 gap-1.5 text-xs text-muted-foreground sm:grid-cols-2">
                        {selectedProduct.quoteFields.map((field) => (
                          <li key={field} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            <span>{field}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="dimensions"
                        className="block text-xs font-semibold text-foreground"
                      >
                        Kích thước / Quy cách
                      </label>
                      <input
                        id="dimensions"
                        type="text"
                        value={dimensions}
                        onChange={(e) => setDimensions(e.target.value)}
                        placeholder="VD: 50x30mm, lõi 1 inch"
                        className="mt-1.5 w-full rounded-btn border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="quantity"
                        className="block text-xs font-semibold text-foreground"
                      >
                        Số lượng dự kiến
                      </label>
                      <input
                        id="quantity"
                        type="text"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="VD: 50 cuộn / 10.000 tem"
                        className="mt-1.5 w-full rounded-btn border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="deliveryLocation"
                        className="block text-xs font-semibold text-foreground"
                      >
                        Khu vực giao hàng
                      </label>
                      <input
                        id="deliveryLocation"
                        type="text"
                        value={deliveryLocation}
                        onChange={(e) => setDeliveryLocation(e.target.value)}
                        placeholder="VD: KCN Bắc Thăng Long, HN"
                        className="mt-1.5 w-full rounded-btn border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="materialPreference"
                      className="block text-xs font-semibold text-foreground"
                    >
                      Bề mặt dán / Chất liệu mong muốn (nếu có)
                    </label>
                    <input
                      id="materialPreference"
                      type="text"
                      value={materialPreference}
                      onChange={(e) => setMaterialPreference(e.target.value)}
                      placeholder="VD: Dán thùng carton lưu kho thường / Dán chai nhựa bảo quản lạnh / Máy in TSC..."
                      className="mt-1.5 w-full rounded-btn border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-foreground"
                    >
                      Nội dung yêu cầu chi tiết *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Mô tả thêm về yêu cầu in ấn (tem trắng hay in mấy màu, cán màng bóng/mờ, tiến độ cần hàng...)"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className="mt-1.5 w-full rounded-btn border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none"
                    />
                    {errors.message && (
                      <p id="message-error" role="alert" className="mt-1 text-xs text-error">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button & Honest Status Notice */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2.5 rounded-btn border border-foreground bg-foreground px-7 py-3.5 text-sm font-medium text-on-dark transition-colors hover:bg-foreground-soft disabled:opacity-60"
                  >
                    <Send className="h-4 w-4" />
                    <span>
                      {isSubmitting
                        ? "Đang kiểm tra & lập phiếu báo giá..."
                        : "Gửi yêu cầu báo giá"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-2 rounded-btn border border-border bg-surface/60 px-4 py-3 text-xs font-medium text-foreground transition-colors hover:border-foreground"
                  >
                    <Copy className="h-3.5 w-3.5 text-accent" />
                    <span>
                      {copiedSummary
                        ? "Đã sao chép bảng thông số!"
                        : "Sao chép tóm tắt thông số"}
                    </span>
                  </button>
                </div>

                {/* Submission Result Feedback */}
                {submitResult && (
                  <div
                    role="status"
                    className={`rounded-sm border p-5 ${
                      submitResult.ok
                        ? "border-success/50 bg-surface/90 text-foreground"
                        : "border-error/50 bg-surface/90 text-error"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {submitResult.ok ? (
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                      ) : (
                        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-error" />
                      )}
                      <div className="w-full">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-sm font-semibold">
                            {submitResult.ok
                              ? submitResult.deliveryMode === "live_webhook" ? "Yêu cầu đã được gửi" : "Đã kiểm tra hợp lệ · Chưa gửi yêu cầu"
                              : "Chưa thể hoàn tất phiếu yêu cầu"}
                          </h3>
                          {submitResult.referenceCode && (
                            <span className="rounded bg-foreground px-2.5 py-0.5 font-mono text-xs font-semibold text-on-dark">
                              Mã phiếu: {submitResult.referenceCode}
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                          {submitResult.message}
                        </p>

                        {submitResult.ok && (
                          <div className="mt-4 rounded border border-border bg-background-pure p-3.5">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-accent">
                                BẢN TÓM TẮT THÔNG SỐ ĐÃ LẬP
                              </span>
                              <button
                                type="button"
                                onClick={handleCopySummary}
                                className="font-mono text-[11px] font-medium text-foreground underline"
                              >
                                {copiedSummary ? "Đã sao chép" : "Sao chép văn bản"}
                              </button>
                            </div>
                            <pre className="mt-2 whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-foreground-soft">
                              {formattedSpecSummary}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* LEFT COLUMN (5/12): Corporate Contact Info + Quick Guide + B2B FAQ */}
          <div className="space-y-8 lg:order-1 lg:col-span-5">
            <div className="border border-border bg-background-pure p-6 md:p-8">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                THÔNG TIN LIÊN HỆ DOANH NGHIỆP
              </p>
              <h2 className="heading-h3 mt-2 text-foreground">
                {COMPANY_INFO.legalName}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Phục vụ khách hàng doanh nghiệp, nhà máy sản xuất và kho vận tại{" "}
                <strong className="font-medium text-foreground">
                  {COMPANY_INFO.locationRegion}
                </strong>
                .
              </p>

              <dl className="mt-6 divide-y divide-border border-t border-border text-sm">
                <div className="py-3.5">
                  <dt className="font-semibold text-foreground">
                    Địa chỉ văn phòng & xưởng
                  </dt>
                  <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {COMPANY_INFO.contacts.address.includes("TODO_CONTENT") ? "Đang cập nhật trong bản demo." : COMPANY_INFO.contacts.address}
                  </dd>
                </div>

                <div className="py-3.5">
                  <dt className="font-semibold text-foreground">
                    Hotline Kinh doanh & Báo giá
                  </dt>
                  <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {COMPANY_INFO.contacts.hotline.includes("TODO_CONTENT") ? "Đang cập nhật." : COMPANY_INFO.contacts.hotline}
                  </dd>
                </div>

                <div className="py-3.5">
                  <dt className="font-semibold text-foreground">
                    Email tiếp nhận thông số & file in
                  </dt>
                  <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {COMPANY_INFO.contacts.email.includes("TODO_CONTENT") ? "Đang cập nhật." : COMPANY_INFO.contacts.email}
                  </dd>
                </div>

                <div className="py-3.5">
                  <dt className="font-semibold text-foreground">
                    Thời gian làm việc
                  </dt>
                  <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {COMPANY_INFO.contacts.workingHours.includes("TODO_CONTENT") ? "Đang cập nhật." : COMPANY_INFO.contacts.workingHours}
                  </dd>
                </div>
              </dl>

              {/* Conditional Zalo Button — Only rendered if official Zalo URL is confirmed */}
              {COMPANY_INFO.contacts.zaloUrl ? (
                <div className="mt-6">
                  <a
                    href={COMPANY_INFO.contacts.zaloUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-btn border border-foreground bg-foreground px-5 py-3 text-xs font-medium text-on-dark transition-colors hover:bg-foreground-soft"
                  >
                    Chat trực tiếp qua Zalo Official
                  </a>
                </div>
              ) : (
                <div className="mt-5 rounded-sm border border-border bg-surface/60 p-3.5 text-xs leading-relaxed text-muted-foreground">
                  Thông tin liên hệ chính thức đang được xác nhận. Biểu mẫu hiện ở chế độ demo, chưa gửi yêu cầu đến Sunflower.
                </div>
              )}
            </div>

            {/* B2B Ordering FAQs */}
            <div className="border border-border bg-background-pure p-6 md:p-8">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                CÂU HỎI THƯỜNG GẶP KHI ĐẶT HÀNG B2B
              </p>
              <div className="mt-4 divide-y divide-border">
                {B2B_ORDERING_FAQS.map((faq) => (
                  <EditorialDetails key={faq.q} title={faq.q}>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {faq.a}
                    </p>
                  </EditorialDetails>
                ))}
              </div>
            </div>
            <section id="chinh-sach-bao-mat" aria-labelledby="quote-privacy-heading" className="border-t border-border pt-6">
              <h2 id="quote-privacy-heading" className="text-sm font-medium">Bảo mật thông tin báo giá</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Chỉ điền thông tin liên hệ và quy cách cần thiết cho yêu cầu. Không đưa dữ liệu nội bộ hoặc tài liệu khách hàng chưa được phép chia sẻ vào phiếu. Bản demo chưa kết nối nơi nhận báo giá chính thức.</p>
            </section>
          </div>

        </div>
      </div>
    </section>
  );
}
