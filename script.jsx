import folderImage from './folder.png';

const Main = () => {
  return (
    <div class="container">
      <h1>Aiden Bai</h1>
      <p>
        ◕ ◡ ◕ っ Hi, I'm Aiden! I'm a 17 y/o from Washington State making the
        web faster through HCI research and open source.
      </p>
    </div>
  );
};

let init = false;
document.body.style.overflow = 'hidden';

const createFolder = (name, hue = 0, left = 50, top = 50) => {
  const folder = (
    <div
      draggable="false"
      class="folder"
      style={{
        position: 'absolute',
        'z-index': 1000,
        left: `${left}%`,
        top: `${top}%`,
        filter: hue ? `hue-rotate(${hue}deg)` : 'none',
      }}
    >
      <img src={folderImage} />
      <span>{name}</span>
    </div>
  );

  const drag = (event) => {
    const { left, top } = folder.getBoundingClientRect();

    const shiftX = event.clientX - left;
    const shiftY = event.clientY - top;

    const moveAt = (pageX, pageY) => {
      const { width, height } = document.body.getBoundingClientRect();
      folder.style.left = `${((pageX - shiftX) / width) * 100}%`;
      folder.style.top = `${((pageY - shiftY) / height) * 100}%`;
    };

    const onMouseMove = ({ pageX, pageY }) => moveAt(pageX, pageY);

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onMouseMove);
      folder.removeEventListener('mouseup', onMouseUp);
      folder.removeEventListener('touchend', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onMouseMove);
    folder.addEventListener('mouseup', onMouseUp);
    folder.addEventListener('touchend', onMouseUp);
  };

  folder.addEventListener('mousedown', drag);
  folder.addEventListener('touchmove', drag);

  folder.addEventListener('dragstart', (event) => {
    event.preventDefault();
  });

  folder.addEventListener('click', () => {
    if (!init) {
      init = true;
      let num = 0;
      const paint = (timeout) => {
        createFolder(
          `./folder${num}`,
          Math.random() * 360,
          Math.random() * 100,
          Math.random() * 100
        );
        if (timeout > 1) {
          setTimeout(() => {
            num++;
            paint(timeout * 0.95);
          }, timeout * 0.95);
        } else {
          document.body.style.transition = '1s';
          document.body.style.opacity = 0;

          setTimeout(() => {
            document.body.textContent = '';
            document.body.style.overflow = 'visible';
            document.body.style.opacity = 100;
            document.body.appendChild(<Main />);
          }, 1100);
        }
      };
      paint(90);
    }
  });

  document.getElementById('root').appendChild(folder);
};

createFolder('./aidenybai');
