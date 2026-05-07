import { PropsHeader } from "@/utils/types";
import { getHeader } from "@/utils/FUNc";

const Header = async () => {
  const data: PropsHeader[] = await getHeader();

  const firstItem = Array.isArray(data) ? data[0] : data;

  const dsc = `Donate: If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill. There is no minimum donation, any sum is appreciated - click here to donate using PayPal. Thank you for your support. Donate bitcoin: 16UQLq1HZ3CNwhvgrarV6pMoA2CDjb4tyF`;

  return (
    <section className="flex flex-col justify-center items-center gap-5 text-center">
      <h1>{firstItem.project_title || "default data"}</h1>
      <q>{firstItem.description || dsc}</q>
    </section>
  );
};

export default Header;
