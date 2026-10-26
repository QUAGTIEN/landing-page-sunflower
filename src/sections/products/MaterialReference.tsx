import { SectionHeading, TextLink } from "@/components/ui/Primitives";

const MATERIAL_COMPARISON_ROWS = [
  {
    substrate: "Decal giấy (Couche mờ / bán bóng)",
    printingMethod: "In Flexo/Offset hoặc in mã vạch qua mực Ribbon Wax / Wax-Resin",
    environment: "Môi trường khô ráo, kho vận trong nhà, bao bì thùng carton, nhãn phụ hàng hóa",
    durability: "Tiêu chuẩn · Kinh tế cho sản lượng lớn",
  },
  {
    substrate: "Decal cảm nhiệt trực tiếp (Direct Thermal)",
    printingMethod: "In nhiệt trực tiếp từ đầu in mã vạch (Không dùng mực Ribbon)",
    environment: "Tem vận đơn TMĐT, tem cân siêu thị, phiếu giao nhận lưu chuyển ngắn ngày",
    durability: "Ngắn hạn · Nhạy cảm với nhiệt độ cao & ánh nắng trực tiếp",
  },
  {
    substrate: "Decal màng nhựa PP / PVC (Trắng sữa / Trong suốt)",
    printingMethod: "In màu bao bì hoặc in mã vạch kết hợp mực Ribbon Wax-Resin / Resin",
    environment: "Chai lọ thực phẩm, mỹ phẩm, kho lạnh, môi trường có độ ẩm và ngưng tụ hơi nước",
    durability: "Cao · Xé không rách, kháng nước & dầu mỡ nhẹ",
  },
  {
    substrate: "Decal Xi bạc / PET kim loại mờ",
    printingMethod: "In truyền nhiệt bằng mực Ribbon Resin 100%",
    environment: "Tem thông số máy móc, linh kiện điện tử, thiết bị cơ khí tỏa nhiệt",
    durability: "Rất cao · Chịu nhiệt, kháng ma sát & dung môi nhẹ",
  },
  {
    substrate: "Nhãn vải Dệt (Woven) & Satin / Ruban",
    printingMethod: "Dệt sợi mật độ cao hoặc in nhiệt/in mực chuyên dụng ngành may",
    environment: "Tem cổ áo, tem sườn hướng dẫn sử dụng (Care label) chịu giặt ủi nhiều lần",
    durability: "Cao · Bền màu qua chu kỳ giặt công nghiệp",
  },
];


/** One dataset, server-rendered table and mobile reading layout. */
export function MaterialReference() {
  return (
    <section id="material-reference" aria-labelledby="material-reference-heading" className="material-reference section-spacing">
      <div className="container-editorial">
        <SectionHeading id="material-reference-heading" eyebrow="THAM CHIẾU CHẤT LIỆU"
          title="Đối chiếu chất liệu."
          description="So sánh phương thức in, bề mặt sử dụng và độ bền trước khi trao đổi quy cách."
          align="split" rightSlot={<TextLink href="/lien-he?nhu-cau=tu-van-vat-lieu">Nhận tư vấn vật liệu</TextLink>} />
        <div className="material-reference__desktop" role="region" aria-label="Bảng so sánh chất liệu" tabIndex={0}>
          <table>
            <caption className="sr-only">Đối chiếu năm dòng chất liệu theo phương thức in, môi trường và độ bền.</caption>
            <colgroup><col /><col /><col /><col /></colgroup>
            <thead><tr><th scope="col">Vật liệu</th><th scope="col">Phương thức in</th><th scope="col">Bề mặt & môi trường</th><th scope="col">Độ bền</th></tr></thead>
            <tbody>
              {MATERIAL_COMPARISON_ROWS.map((row) => (
                <tr key={row.substrate}><th scope="row">{row.substrate}</th><td>{row.printingMethod}</td><td>{row.environment}</td><td>{row.durability}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="material-reference__mobile" aria-label="Chất liệu theo từng ứng dụng">
          {MATERIAL_COMPARISON_ROWS.map((row) => (
            <article key={row.substrate} className="material-card">
              <h3>{row.substrate}</h3>
              <dl><div><dt>Phương thức in</dt><dd>{row.printingMethod}</dd></div><div><dt>Bề mặt & môi trường</dt><dd>{row.environment}</dd></div><div><dt>Độ bền</dt><dd>{row.durability}</dd></div></dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
