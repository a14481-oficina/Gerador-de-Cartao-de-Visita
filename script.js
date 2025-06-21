document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('cardForm');
    const preview = document.getElementById('cardPreview');
    const downloadBtn = document.getElementById('downloadPDF');
    const qrcodeDiv = document.getElementById('qrcode');

    // Botão para baixar como imagem
    let downloadImgBtn = document.getElementById('downloadIMG');
    if (!downloadImgBtn) {
        downloadImgBtn = document.createElement('button');
        downloadImgBtn.id = 'downloadIMG';
        downloadImgBtn.textContent = 'Download Imagem';
        downloadImgBtn.style.marginLeft = '10px';
        downloadBtn.after(downloadImgBtn);
    }

    // Função para remover acentos do QR Code (garante compatibilidade)
    function removerAcentos(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function updatePreview() {
        const nome = document.getElementById('nome').value;
        const cargo = document.getElementById('cargo').value;
        const empresa = document.getElementById('empresa').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const website = document.getElementById('website').value;

        preview.innerHTML = `
            <div class="card-content" style="background: linear-gradient(135deg, #007bff 60%, #00c6ff 100%); color: #fff; border-radius: 18px; padding: 24px 20px; max-width: 350px; margin: 0 auto; box-shadow: 0 4px 16px rgba(0,0,0,0.10); border: 2px solid #fff;">
                <strong style="font-size:1.5em; letter-spacing:1px; font-weight:700;">${nome || 'Seu Nome'}</strong>
                <hr class="divider" style="height:1px; background:rgba(255,255,255,0.25); margin:10px 0 12px 0; border:none;">
                <span style="display:block; margin-bottom:4px; font-size:1.08em; opacity:0.97; font-weight:500;">${cargo || 'Cargo'}</span>
                <span style="display:block; margin-bottom:4px; font-size:1.08em; opacity:0.97; font-weight:500;">${empresa || ''}</span>
                <span style="display:block; margin-bottom:4px; font-size:1.08em; opacity:0.97; font-weight:500;">${email || ''}</span>
                <span style="display:block; margin-bottom:4px; font-size:1.08em; opacity:0.97; font-weight:500;">${telefone || ''}</span>
                <span style="display:block; margin-bottom:4px; font-size:1.08em; opacity:0.97; font-weight:500;">${website || ''}</span>
            </div>
        `;

        qrcodeDiv.innerHTML = '';
        if ((nome || email || telefone) && typeof QRCode === 'function') {
            setTimeout(() => {
                const vCard = [
                    "BEGIN:VCARD",
                    "VERSION:3.0",
                    `FN:${removerAcentos(nome)}`,
                    `ORG:${removerAcentos(empresa)}`,
                    `TITLE:${removerAcentos(cargo)}`,
                    `EMAIL:${email}`,
                    `TEL:${telefone}`,
                    `URL:${website}`,
                    "END:VCARD"
                ].join('\n');

                try {
                    new QRCode(qrcodeDiv, {
                        text: vCard,
                        width: 100,
                        height: 100,
                        colorDark: "#000000",
                        colorLight: "#ffffff",
                        correctLevel: QRCode.CorrectLevel.H
                    });
                } catch (error) {
                    qrcodeDiv.innerHTML = '<p style="color:red;">Erro ao gerar QR Code</p>';
                    console.error('Erro no QR Code:', error);
                }
            }, 0);
        }
    }

    form.addEventListener('input', updatePreview);
    updatePreview();

    downloadBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const cardContent = preview.querySelector('.card-content');
        html2canvas(cardContent, { scale: 4, useCORS: true, backgroundColor: null }).then(function (canvas) {
            const imgData = canvas.toDataURL('image/png');
            let jsPDF = window.jspdf ? window.jspdf.jsPDF : window.jsPDF;
            if (!jsPDF) {
                alert('jsPDF não está carregado.');
                return;
            }
            const pdfWidth = 350;
            const pdfHeight = canvas.height * (pdfWidth / canvas.width);
            const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [pdfWidth, pdfHeight] });
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('cartao-de-visita.pdf');
        });
    });

    downloadImgBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const cardContent = preview.querySelector('.card-content');
        html2canvas(cardContent, { scale: 4, useCORS: true, backgroundColor: null }).then(function (canvas) {
            const link = document.createElement('a');
            link.download = 'cartao-de-visita.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });
});
