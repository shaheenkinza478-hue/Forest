import Image from 'next/image';

export default function Card({ item }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fade-in">
      <div className="relative h-48 w-full">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <span className="inline-block text-xs font-medium uppercase tracking-wider text-green-700 bg-green-100 px-2 py-1 rounded-full mb-2">
          {item.type}
        </span>
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="mt-1 text-sm text-gray-600">{item.description}</p>
      </div>
    </div>
  );
}