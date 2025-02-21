import AlienItem from "./AlienItem";

function Alien({ aliens }) {
  return (
    <div className="grid w-full grid-cols-2 gap-4 overflow-hidden px-2 sm:grid-cols-2 md:grid-cols-3">
      {aliens.map((alien) => (
        <AlienItem key={alien.id} alien={alien} />
      ))}
    </div>
  );
}

export default Alien;
