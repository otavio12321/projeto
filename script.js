async function getSpeciesName(event) {
    event.preventDefault();
    
    const fileInput = document.getElementById('animal-image');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Por favor, selecione uma imagem.');
        return;
    }
    
    try {
        const formData = new FormData();
        formData.append('image', file);
        
        // Enviar imagem para a API de reconhecimento de imagem
        const recognitionResponse = await fetch('URL_DA_API_DE_RECONHECIMENTO', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': 'Bearer SEU_TOKEN_API' // Adicione seu token de autenticação aqui
            }
        });
        
        if (!recognitionResponse.ok) {
            throw new Error('Erro ao reconhecer a imagem.');
        }
        
        const recognitionResult = await recognitionResponse.json();
        const speciesName = recognitionResult.speciesName; // Assumindo que a resposta da API contém esse campo
        
        if (speciesName) {
            getAnimalInfo(speciesName);
        } else {
            alert('Não foi possível identificar o animal.');
        }
        
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao tentar identificar a imagem.');
    }
}

async function getAnimalInfo(speciesName) {
    try {
        // Enviar o nome da espécie para a API de geração de texto
        const infoResponse = await fetch('URL_DA_API_DE_GERACAO_DE_TEXTO', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer SEU_TOKEN_API' // Adicione seu token de autenticação aqui
            },
            body: JSON.stringify({ speciesName })
        });
        
        if (!infoResponse.ok) {
            throw new Error('Erro ao obter informações sobre o animal.');
        }
        
        const infoResult = await infoResponse.json();
        const animalInfo = infoResult.animalInfo; // Assumindo que a resposta da API contém esse campo
        
        if (animalInfo) {
            alert(animalInfo);
        } else {
            alert('Não foi possível obter informações sobre o animal.');
        }
        
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao tentar obter informações sobre o animal.');
    }
}
