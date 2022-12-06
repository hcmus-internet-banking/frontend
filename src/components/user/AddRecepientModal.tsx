import classNames from "classnames";

type Props = {
  hide: boolean;
  toggle: any;
};

const AddRecepientModal = ({ hide, toggle }: Props) => {

  const hidden = hide ? "hidden" : undefined;
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
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 sm:pt-0">
            <div className="py-4 text-3xl font-bold">Add recipient</div>

              <label>Account number</label>
              <input type="text" className="mt-2 mb-3 w-full bg-gray-100 p-2" />
              <label>Mnemonic name</label>
              <input type="text" className="mt-2 mb-3 w-full bg-gray-100 p-2" />
            </div>
            <div className="bg-gray-200 px-4 py-3 text-right">
              <button
                type="button"
                className="mr-2 rounded bg-gray-500 py-2 px-4 text-white hover:bg-gray-700"
                onClick={toggle}
              >
                <i className="fas fa-times"></i> Cancel
              </button>
              <button
                type="button"
                className="mr-2 rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
              >
                <i className="fas fa-plus"></i> Create
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div
        className={classNames(
          "flex h-full flex-col items-center justify-center bg-gray-100 shadow-xl",
          hidden
        )}
      >
        <div className="py-4 text-3xl font-bold">Add recipient</div>
        <form>
          <section className="space-y-2 pr-4">
            <Input
              className="w-full"
              name="id"
              //   value={formik.values.email}
              //   onChange={formik.handleChange}
              placeholder="Account number"
              //   error={formik.errors.email}
            />

            <Input
              className="w-full"
              name="mnemonicName"
              //   value={formik.values.password}
              //   onChange={formik.handleChange}
              placeholder="Mnemonic Name"
              type="text"
              //   error={formik.errors.password}
            />
          </section>
          <div className="px-4 py-3 text-right">
            <button
              type="button"
              className="mr-2 rounded bg-gray-500 py-2 px-4 text-white hover:bg-gray-700"
              onClick={toggle}
            >
              <i className="fas fa-times"></i> Cancel
            </button>
            <button
              type="button"
              className="mr-2 rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
            >
              <i className="fas fa-plus"></i> Create
            </button>
          </div>
        </form> */}

        {/* <section className="space-y-2 pl-4">
            <Button
              onClick={() => {
                router.push("/register");
              }}
            >
              <span>Add</span>
            </Button>
          </section> */}
     {/* </div> */}
    </>
  );
};

export default AddRecepientModal;
