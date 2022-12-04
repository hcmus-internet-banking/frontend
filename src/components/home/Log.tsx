import Card from "../common/Card/Card";
import Heading from "../common/Heading/Heading";

export function Log({}) {
  return (
    <Card className="max-w-xl">
      <Heading>Log</Heading>

      <div className="space-y-2">
        <div className="flex items-center justify-between space-x-4">
          <span className="aspect-square h-10 w-10 rounded-full bg-lime-200 p-2 text-center">
            1
          </span>
          <span className="line-clamp-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
            accusamus omnis delectus! Ipsam, nemo. Enim modi nam ullam, illo
            possimus sapiente eius expedita! Ipsum libero nam cumque! Amet,
            maxime nobis.
          </span>
        </div>
      </div>
    </Card>
  );
}
