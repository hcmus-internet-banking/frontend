import { MdPayment } from "react-icons/md";
import Card from "../common/Card/Card";

export const Debts = () => {
  return (
    <Card className="bg-gradient-to-tr from-orange-300 to-orange-200">
      <div className=" text-xl font-light uppercase tracking-wide">
        Invoices
      </div>

      <div className="mt-4 space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-1 rounded py-1 px-2 text-sm transition hover:bg-gray-200"
          >
            <MdPayment />

            <div className="flex-1">
              <a>
                <span>Học phí HCMUS</span> <span>-</span> <span>1.000.000</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
