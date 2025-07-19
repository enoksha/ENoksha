const data = {
  mymensingh: {
    "জামালপুর": {
      "ইসলামপুর": {
        "কিসমত জাল্লা (৪৬)": "FILE_ID",
        "জিগাতলা (১-১)": "1eimVfgliJ5g-6gWGdn-eDWFxmppEXYfa",
        "জিগাতলা (১-২)": "1PbtcKMxhikWZnmWqfUPklOvLwS5DUUD6",
        "চর বেড়কুশা (২)": "1Jj6xo1Ap-BieH21li7DOLbst6zelQI5U",
        "বিরকুর্শা (৩)": "1Q50AEpqdvPTaagdi9AxBKky--dfxzuUp",
        "হরিণধরা (৪)": "1OWo2hBWBD4Fwk-x9mkuNy6LKJLjktpKu",
        "সসারিয়াবাড়ী (৫)": "1Wr1yrNeDYt0QGLkPROGtburWolZjsHrn",
        "কৃষ্ণনগর (৬)": "1ogenedMFv5zoXc2FUULgSNbo1bcSx-GU",
        "পাথর্শী (৭)": "1s0kPMmZjpTn7lQL_6cLhK-xk3hZwam6J",
        "মুজাটা (৮-১)": "1ruF8geiHIySnmhF_sZoer4mj_3Ep5oIg",
        "মুজাটা (৮-২)": "11mgX4-gwSVTbKKlikZIJ1YTTns2pjao",
        "কুলকান্দি (৯-১)": "150cg7Kan34Qr0G85hIFhta2nng8kXx11",
        "কুলকান্দি (৯-২)": "1UiuLo_EYCfEA7CrsrMANaB2Xj2efgqD7",
        "ধনতলা (১০)": "1l_F1CfohNKj53a9SZEJKU_TTWJeW_N1c"
      },
      "দেওয়ানগঞ্জ": {
        "উত্তর জোয়ানের চর (১)": "FILE_ID",
        "জোয়ানের চর (২)": "FILE_ID",
        "ডাংধরা (৩)": "FILE_ID",
        "কারখানা (৪)": "FILE_ID",
        "বাঘার চর (৫)": "FILE_ID",
        "মাদারের চর (৬)": "FILE_ID",
        "চর মাদার (৭)": "FILE_ID",
        "গোয়ালকুল (৮)": "FILE_ID",
        "হারুয়াবাড়ী (৯)": "FILE_ID"
      },
      "মেলান্দহ": {
        "হাতিজা (১)": "FILE_ID",
        "সরুলিয়া (২)": "FILE_ID",
        "আমবাড়ীয়া (৩)": "FILE_ID",
        "জাঙ্গালীয়া (৪)": "FILE_ID",
        "গোকুলের পাড়া (৫)": "FILE_ID",
        "কলাবাধা (৬)": "FILE_ID",
        "দিগর কলাবাধা (৭)": "FILE_ID",
        "সুলতানখালী (৮)": "FILE_ID",
        "চরপাংশি (৯)": "FILE_ID",
        "বাহেরচর (১০)": "FILE_ID"
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', function() {
  const divisionSelect = document.getElementById("division");
  divisionSelect.innerHTML = '<option value="">বিভাগ নির্বাচন করুন</option>';
  for (let division in data) {
    divisionSelect.innerHTML += `<option value="${division}">${division}</option>`;
  }

  document.getElementById("division").addEventListener("change", function() {
    const division = this.value;
    const districts = data[division] || {};
    const districtSelect = document.getElementById("district");
    districtSelect.innerHTML = '<option value="">জেলা নির্বাচন করুন</option>';
    for (let district in districts) {
      districtSelect.innerHTML += `<option value="${district}">${district}</option>`;
    }
    document.getElementById("upazila").innerHTML = '<option value="">উপজেলা নির্বাচন করুন</option>';
    document.getElementById("mouzaMap").innerHTML = '<option value="">মৌজা নির্বাচন করুন</option>';
  });

  document.getElementById("district").addEventListener("change", function() {
    const division = document.getElementById("division").value;
    const district = this.value;
    const upazilas = data[division]?.[district] || {};
    const upazilaSelect = document.getElementById("upazila");
    upazilaSelect.innerHTML = '<option value="">উপজেলা নির্বাচন করুন</option>';
    for (let upazila in upazilas) {
      upazilaSelect.innerHTML += `<option value="${upazila}">${upazila}</option>`;
    }
    document.getElementById("mouzaMap").innerHTML = '<option value="">মৌজা নির্বাচন করুন</option>';
  });

  document.getElementById("upazila").addEventListener("change", function() {
    const division = document.getElementById("division").value;
    const district = document.getElementById("district").value;
    const upazila = this.value;
    const mouzas = data[division]?.[district]?.[upazila] || {};
    const mouzaSelect = document.getElementById("mouzaMap");
    mouzaSelect.innerHTML = '<option value="">মৌজা নির্বাচন করুন</option>';
    for (let mouza in mouzas) {
      mouzaSelect.innerHTML += `<option value="${mouza}">${mouza}</option>`;
    }
  });

  document.getElementById("mouzaForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const division = document.getElementById("division").value;
    const district = document.getElementById("district").value;
    const upazila = document.getElementById("upazila").value;
    const mouzaSelect = document.getElementById("mouzaMap");
    const selectedMouzas = Array.from(mouzaSelect.selectedOptions).map(option => option.value);
    const downloadList = document.getElementById("downloadList");
    downloadList.innerHTML = '';

    selectedMouzas.forEach(mouza => {
      const fileId = data[division]?.[district]?.[upazila]?.[mouza];
      if (fileId && fileId !== "FILE_ID") {
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        const fileName = `${mouza}.jpg`;
        const fileSize = (Math.random() * 20 + 5).toFixed(2); // Simulated file size in MB
        downloadList.innerHTML += `
          <div class="download-item">
            <span>${fileName} (${fileSize} MB)</span>
            <a href="${downloadUrl}" target="_blank" download="${fileName}">⬇️</a>
          </div>
        `;
      }
    });

    if (downloadList.innerHTML === '') {
      alert("এই নির্বাচিত অপশনের জন্য কোনো ফাইল পাওয়া যায়নি!");
    }
  });
});
