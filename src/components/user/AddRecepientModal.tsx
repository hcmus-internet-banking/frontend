import Button from "../common/Button/Button";
import Input from "../common/Input/Input";
import Modal from "../common/Modal/Modal";

type Props = {
  hide: boolean | undefined;
  toggle: any;
};

const AddRecepientModal = ({ hide, toggle }: Props) => {
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
      <Modal title="Add recipient" hide={hide} toggle={toggle}>
        <form>
          {/* onSubmit={formik.handleSubmit} */}

          <section className="space-y-5">
            <Input type="text" className="w-full" placeholder="Mnemonic name" />
            <Input
              type="text"
              className="w-full"
              placeholder="Account number"
            />
          </section>
          <div className="mt-0 grid grid-cols-1 gap-2 p-4 sm:mt-5 sm:grid-cols-2">
            <Button type="button" onClick={toggle}>
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddRecepientModal;
