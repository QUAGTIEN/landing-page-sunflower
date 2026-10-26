import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HOME_SOLUTIONS } from "@/content/home";
import { TextLink } from "@/components/ui/Primitives";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function SolutionsAndApplications() {
  return (
    <section aria-labelledby="solutions-heading" className="home-solutions home-solutions--readable home-section">
      <div className="home-container home-solutions__grid">
        <RevealOnScroll>
          <p className="home-kicker">04 / ỨNG DỤNG</p>
          <h2 id="solutions-heading" className="home-title">Đúng chất liệu.<br />Đúng nhu cầu.</h2>
          <p className="home-body">Mỗi bề mặt, môi trường sử dụng và dây chuyền đóng gói cần một lựa chọn riêng.</p>
          <TextLink href="/giai-phap">Tất cả giải pháp</TextLink>
        </RevealOnScroll>
        <div className="home-solution-list">
          {HOME_SOLUTIONS.map((solution, index) => (
            <RevealOnScroll key={solution.slug} delayMs={index * 40}>
              <Link href={`/giai-phap#${solution.slug}`} className="home-solution">
                <span className="home-index">0{index + 1}</span>
                <div><h3>{solution.title}</h3><p>{solution.description}</p></div>
                <ArrowUpRight size={24} aria-hidden="true" />
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
