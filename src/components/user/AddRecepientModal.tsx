import classNames from "classnames";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Button from "../common/Button/Button";
import Heading from "../common/Heading/Heading";
import Input from "../common/Input/Input";
import Spacer from "../common/Spacer/Spacer";

type Props = {
  hide: boolean;
  toggle: any;
};

const AddRecepientModal = ({ hide, toggle }: Props) => {
  const hidden = hide ? "hidden" : undefined;

  // const formik = useFormik({
  //   initialValues: {
  //     mnemonicNAme: "",
  //     accountNumber: 0,
  //   },
  //   validateOnBlur: false,
  //   validateOnChange: isSubmitted,
  //   validationSchema: toFormikValidationSchema(addRecipientValidate),
  //   onSubmit: async (values) => {
  //     setIsSubmitted(true);

  //     const result = dispatch().unwrap();

  //     toast.promise(
  //       result,
  //       {
  //         loading: "Loading...",
  //         success: ({ data }) => {
  //           if (data.id !== null) {
  //             toast.success(JSON.stringify(data));
  //             router.push("/");
  //           }
  //           return "Success";
  //         },
  //         error: null,
  //       },
  //       noToastErrorOption
  //     );
  //   },
  // });
  return (
    <>
      <div
        className={classNames(
          "fixed top-0 left-0 z-10 w-full overflow-y-auto",
          hidden
        )}
      >
        <div className="min-height-100vh flex items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-900 opacity-75" />
          </div>
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle">
            &#8203;
          </span>
          <div
            className="align-center inline-block transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="w-full bg-white p-6">
              <div className="flex w-full justify-around">
                <Heading className="grow font-bold">Add recipient</Heading>
                <div
                  className="p-2 text-xl font-bold hover:cursor-pointer hover:opacity-25"
                  onClick={toggle}
                >
                  X
                </div>
              </div>
              <Spacer className="h-1" />
              <div className="grid grid-cols-1 divide-x">
                {/* onSubmit={formik.handleSubmit} */}
                <form>
                  <section className="space-y-5">
                    <Input
                      type="text"
                      className="w-full"
                      placeholder="Mnemonic name"
                    />
                    <Input
                      type="text"
                      className="w-full"
                      placeholder="Account number"
                    />
                    <div className="mt-0 grid grid-cols-1 gap-2 p-4 sm:mt-5 sm:grid-cols-2">
                      <Button type="button" onClick={toggle}>
                        Cancel
                      </Button>
                      <Button type="submit">Add</Button>
                    </div>
                  </section>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRecepientModal;
