function myAlert(icon, title) {
  Swal.fire({
    toast: true,
    position: 'top',
    icon: icon,
    title: title,
    timer: 5000,
    timerProgressBar: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    showCloseButton: true,
    customClass: {
      popup: 'custom-toast',
    },
    willOpen: () => {
      const style = document.createElement('style');
      style.innerHTML = `
                        .custom-toast {
                            font-family: 'Arial', sans-serif;
                            font-size: 12px;
                            background-color: rgb(255, 255, 255);
                            color: #262626;
                        }
                    `;
      document.head.appendChild(style);
    },
  });
} 
function resizeAndConvert() {
  let fileInput = document.getElementById('fileInput');
  if (fileInput.files.length === 0) return;

  let file = fileInput.files[0];
  let reader = new FileReader();

  reader.onload = function (event) {
    let img = new Image();
    img.src = event.target.result;

    img.onload = function () {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');

      canvas.width = 200;
      canvas.height = 200;
      ctx.drawImage(img, 0, 0, 200, 200);

      let base64String = canvas.toDataURL('image/jpeg', 0.8);
      document.getElementById('profileImage').src = base64String;
    };
  };
  reader.readAsDataURL(file);
}

window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);

  const platform = urlParams.get('platform');
  const email = urlParams.get('email');
  let fullname = urlParams.get('fullname');

  if ('undefined' == fullname) {
    fullname = '';
  }

  if (fullname) document.getElementById('fullName').value = fullname;
  if (email) {
    const emailField = document.getElementById('email');
    emailField.value = email;
    emailField.readOnly = true;
  }
  if (platform) {
    const platformField = document.getElementById('platform');
    platformField.value = platform;
    platformField.readOnly = true;
  }

  const defaultUrl =
    'https://res.cloudinary.com/dmini3yl9/image/upload/v1730714916/di75th4l9fqebilewtur.avif';
  const img = document.getElementById('profile-img');

 
  const inputFields = document.querySelectorAll('input');
  inputFields.forEach((input) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        document.getElementById('submit-button').click();
        event.preventDefault();
      }
    });
  });
  function validateInput(fullName, userName, password, confirmPassword) {
    
    if (fullName.length < 3) {
      myAlert('error', 'Full name must be at least 3 characters long.');
      return false;
    }
    if (!profileUrl) {
      myAlert('error', 'Choose a Profile');
      return false;
    }
    if (fullName.length > 50) {
      myAlert('error', 'Full name cannot exceed 50 characters.');
      return false;
    }

    if (userName.length < 7) {
      myAlert('error', 'Username must be at least 7 characters long.');
      return false;
    }
    if (userName.length > 50) {
      myAlert('error', 'Username cannot exceed 50 characters.');
      return false;
    }

    if (password.length < 7) {
      myAlert('error', 'Password must be at least 7 characters long.');
      return false;
    }
    if (password.length > 50) {
      myAlert('error', 'Password cannot exceed 50 characters.');
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      myAlert('error', 'Password must include at least one uppercase letter.');
      return false;
    }
    if (!/[0-9]/.test(password)) {
      myAlert('error', 'Password must include at least one number.');
      return false;
    }

    if (password !== confirmPassword) {
      myAlert('error', 'Passwords do not match. Please try again.');
      return false;
    }

    return true;
  }

  document.getElementById('submit-button').onclick = async function (event) {
    event.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const userName = document.getElementById('userName').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
myAlert('info','Validating');
let profileUrlBase64;
 let fileInput = document.getElementById('fileInput');
 if (fileInput.files.length === 0) return;

 let file = fileInput.files[0];
 let reader = new FileReader();

 reader.onload = function (event) {
   let img = new Image();
   img.src = event.target.result;

   img.onload = function () {
     let canvas = document.createElement('canvas');
     let ctx = canvas.getContext('2d');

     canvas.width = 200;
     canvas.height = 200;
     ctx.drawImage(img, 0, 0, 200, 200);

     let base64String = canvas.toDataURL('image/jpeg', 0.8);
     document.getElementById('profileImage').src = base64String;
     profileUrlBase64=base64String;
   };
 };
 reader.readAsDataURL(file);


    if (validateInput(fullName, userName, password, confirmPassword)) {
       
      await axios
        .post(
          'https://ping-server-2.onrender.com/auth/signupSuccessful',
          {
            fullName,
            userName,
            password,
            email,
            platform: 'Blog',
            profileUrl: profileUrlBase64,
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          myAlert('success', response.data.message);
          window.location.href = 'https://ping-server-2.onrender.com/auth/home';
        })
        .catch((error) => {
          myAlert(
            'error',
            error.response?.data?.message || 'An error occurred'
          );
        });
    }
  };
};

document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    document.querySelector('.btnClick').click();
  }
});
 