// QR Code Download
const downloadBtn = document.getElementById('downloadQrBtn');
const qrImage = document.getElementById('qrImage');

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = qrImage.src;
  link.download = 'gcash_qr_code.png';
  link.click();
});

// Open GCash
function openGCash() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;

  if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
    window.location.href = "gcash://";
  } else if (/android/i.test(ua)) {
    window.location.href = "intent://#Intent;scheme=gcash;package=com.gcash.android;end";
  } else {
    alert("Please open the GCash app to proceed with payment.");
  }
}

const openButton = document.getElementById('openButton');
openButton?.addEventListener('click', openGCash);

// Copy Mobile Number
const copyBtn = document.getElementById("copyNumberBtn");
const mobileNumber = "09918030406";

copyBtn?.addEventListener("click", async () => {
  const originalText = copyBtn.innerHTML;
  try {
    await navigator.clipboard.writeText(mobileNumber);
  } catch {
    const input = document.createElement("input");
    input.value = mobileNumber;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  }

  copyBtn.innerHTML = "Copied!";
  setTimeout(() => {
    copyBtn.innerHTML = originalText;
  }, 1000);
});
