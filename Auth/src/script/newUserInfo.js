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
    customClass: { popup: 'custom-toast' },
    willOpen: () => {
      const style = document.createElement('style');
      style.innerHTML = `.custom-toast { font-family: 'Arial', sans-serif; font-size: 12px; background-color: rgb(255, 255, 255); color: #262626; }`;
      document.head.appendChild(style);
    },
  });
}

function resizeAndConvert(file) {
  return new Promise((resolve) => {
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
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
    };
    reader.readAsDataURL(file);
  });
}

window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const platform = urlParams.get('platform');
  const email = urlParams.get('email');
  let fullname = urlParams.get('fullname') || '';

  if (fullname) document.getElementById('fullName').value = fullname;
  if (email) {
    document.getElementById('email').value = email;
    document.getElementById('email').readOnly = true;
  }
  if (platform) {
    document.getElementById('platform').value = platform;
    document.getElementById('platform').readOnly = true;
  }

  const defaultUrl =
    'https://res.cloudinary.com/dmini3yl9/image/upload/v1730714916/di75th4l9fqebilewtur.avif';
  const img = document.getElementById('profile-img');

  document.querySelectorAll('input').forEach((input) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        document.getElementById('submit-button').click();
        event.preventDefault();
      }
    });
  });

  function validateInput(
    fullName,
    userName,
    password,
    confirmPassword,
    profileUrl
  ) {
    if (fullName.length < 3)
      return myAlert('error', 'Full name must be at least 3 characters long.');
    if (!profileUrl) return myAlert('error', 'Choose a Profile');
    if (fullName.length > 50)
      return myAlert('error', 'Full name cannot exceed 50 characters.');
    if (userName.length < 7)
      return myAlert('error', 'Username must be at least 7 characters long.');
    if (userName.length > 50)
      return myAlert('error', 'Username cannot exceed 50 characters.');
    if (password.length < 7)
      return myAlert('error', 'Password must be at least 7 characters long.');
    if (password.length > 50)
      return myAlert('error', 'Password cannot exceed 50 characters.');
    if (!/[A-Z]/.test(password))
      return myAlert(
        'error',
        'Password must include at least one uppercase letter.'
      );
    if (!/[0-9]/.test(password))
      return myAlert('error', 'Password must include at least one number.');
    if (password !== confirmPassword)
      return myAlert('error', 'Passwords do not match.');
    return true;
  }

  document.getElementById('submit-button').onclick = async function (event) {
    event.preventDefault();
    myAlert('info', 'Validating');

    const fullName = document.getElementById('fullName').value;
    const userName = document.getElementById('userName').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    let fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0)
      return myAlert('error', 'Choose a Profile');

    let profileUrlBase64 = await resizeAndConvert(fileInput.files[0]);
    document.getElementById('profileImage').src = profileUrlBase64;

    if (
      validateInput(
        fullName,
        userName,
        password,
        confirmPassword,
        profileUrlBase64
      )
    ) {
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
            headers: { 'Content-Type': 'application/json' },
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
  if (e.key === 'Enter') document.querySelector('.btnClick').click();
});
