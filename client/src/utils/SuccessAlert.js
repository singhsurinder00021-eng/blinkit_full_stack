import Swal from "sweetalert2";

const successAlert = (title) =>
  Swal.fire({
    icon: "success",
    title,
  });

export default successAlert;