import { toast } from '../vanilla/toast/toast';

function ToastPage() {
  return (
    <div>
      <button
        onClick={() => {
          toast.success({
            title: 'Data fetched successfully',
            desc: 'your request has been processed successfully. It may take 5 to 10 minute to reflect',
            duration: 10000,
          });
        }}
      >
        success
      </button>
      <button
        onClick={() =>
          toast.error({
            title: 'oops!',
            desc: Math.random().toString(),
            duration: 3000,
            position: 'bottom-left',
          })
        }
      >
        Error
      </button>
    </div>
  );
}

export default ToastPage;
