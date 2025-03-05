function FavoriteItem({ favorito, onRemove, isOwner }) {
  return (
    <div className="relative h-16 overflow-hidden rounded-lg bg-gray-900">
      <div className="absolute inset-0 h-full w-full">
        <img
          src={favorito.imageUrl}
          alt={favorito.name}
          className="h-full w-full object-cover opacity-50"
        />
      </div>

      <div className="relative z-10 flex h-full items-center justify-between px-4">
        <div className="flex-1 text-center">
          <span className="rounded px-2 py-1 text-lg font-medium tracking-wide text-white shadow-sm">
            {favorito.name}
          </span>
        </div>

        {isOwner && (
          <button
            onClick={() => onRemove(favorito.id)}
            className="flex h-8 w-8 items-center justify-center rounded bg-gray-800/70 backdrop-blur-sm hover:bg-gray-700"
            aria-label="Eliminar"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default FavoriteItem;
