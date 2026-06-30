import Swal from 'sweetalert2';

export const showDeletedProjectAlert = (msg: string) => {
  return Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: `${msg} Deleted`,
    showConfirmButton: false,
    timer: 1500,
    background: 'rgb(18, 30, 18)',
    color: 'rgb(177, 182, 176)',
    iconColor: '#28a745',
    didOpen: (toast) => {
      toast.style.fontSize = '13px';
      toast.style.padding = '10px 12px';
      toast.style.width = 'auto';
    },
  });
};
