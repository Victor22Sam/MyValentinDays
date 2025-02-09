document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('song');
    const loader = document.querySelector('.loader');
    const lyrics = document.querySelectorAll('.lyric-line');
  

    // Array con los tiempos en segundos para cada línea de la letra
    const lyricTimes = [
        10,      // "No me acordaba de lo rico que era tocar tu piel" (14 - 3)
        15.5,    // "De lo bien que se sentía, abrazarte" (18.5 - 3)
        20,      // "Todo lo que me decías al mirarme" (23 - 3)
        26,      // "Y como tus manos sacudían todos esos problemas de mí" (27 - 3)
        34,      // "Y me hacían olvidar lo cruel que era el mundo" (32 - 3)
        41,      // "Hoy me acuerdo de tus besos aunque ya no estés aquí" (36 - 3)
        45.5,      // "Y de lo mucho que he querido volver a tocarte niña" (40 - 3)
        52,      // "No te olvides de mí" (45 - 3)
        62,      // "Ojalá que nunca se te olvide" (49 - 3)
        67,    // "A dónde quedamos de encontrarnos" (53.5 - 3)
        72,      // "Allá en el futuro donde nadie conoce allá" (58 - 3)
        82,    // "En la distancia que podrá curar, 
        87,    // todo lo que nos hicimos ayer" (62.5 - 3)
        92,      // "Porque algún día te miraré a los ojos y sabremos que a pesar de todo" (67 - 3)
        101,    // "Es como si entre nosotros" (71.5 - 3)
        105,     // "Nada fuera a terminar" (75 - 3)
        132,     // "Ojalá que nunca se te olvide" (62 + 62)
        137,   // "A dónde quedamos de encontrarnos" (67 + 62)
        142,     // "Allá en el futuro donde nadie conoce allá" (72 + 62)
        152,     // "En la distancia que podrá curar" (82 + 62)
        157,     // "todo lo que nos hicimos ayer" (87 + 62)
        162,     // "Porque algún día te miraré a los ojos y sabremos que a pesar de todo" (92 + 62)
        172,     // "Es como si entre nosotros" (101 + 62)
        176.5,      // "Nada fuera a terminar" (105 + 62)
        180
      ];

    // Verifica que el audio y el loader existan
    if (!audio || !loader) return;

    const hideLoader = () => {
        loader.style.display = 'none';
        document.body.classList.remove("not-loaded");
    };

    audio.addEventListener('loadeddata', hideLoader); // Cuando los datos iniciales están cargados
    audio.addEventListener('canplay', hideLoader); // Cuando puede reproducirse
    audio.addEventListener('canplaythrough', hideLoader); // Cuando puede reproducirse sin interrupciones
    
    // 2. Timeout de respaldo por si falla la carga
    const backupTimeout = setTimeout(hideLoader, 5000); // 5 segundos máximo
    
    // 3. Manejar errores
    audio.addEventListener('error', () => {
        clearTimeout(backupTimeout);
        hideLoader();
    });

    // Intentamos reproducir el audio automáticamente
    const startAudio = () => {
        audio.play().then(() => {
            console.log("Audio reproducido automáticamente");
        }).catch(err => {
            console.log("Error al intentar reproducir automáticamente", err);
            // Si no se puede reproducir automáticamente, se espera una interacción
        });
    };
    
    // Iniciar audio automáticamente
    startAudio();

    let isPlaying = false;
    const handlePlayPause = () => {
        if (!isPlaying) {
            audio.play().catch(err => console.log("Esperando interacción..."));
            isPlaying = true;
        } else {
            audio.pause();
            isPlaying = false;
        }
    };
    
    // Agregar ambos tipos de eventos para móvil/desktop
    document.body.addEventListener('click', handlePlayPause);
    document.body.addEventListener('touchstart', handlePlayPause);

    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        lyrics.forEach((lyric, index) => {
            if (currentTime >= lyricTimes[index] && currentTime < lyricTimes[index + 1]) {
                lyric.classList.add('active');
    
                if (index > 0) {
                    lyrics[index - 1].classList.remove('active');
                    lyrics[index - 1].classList.add('exit');
                }
            } else {
                lyric.classList.remove('active');
                lyric.classList.remove('exit');
            }
        });
    });
});

  
  
  
