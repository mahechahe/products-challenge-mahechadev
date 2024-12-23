import { ItemProduct } from './ItemProduct';

const products = [
  {
    id: 1,
    name: 'Tornillos de Alta Resistencia',
    href: '#',
    imageSrc:
      'https://i0.wp.com/scooterscolombia.com/wp-content/uploads/2024/11/categoria_tornillos.png?resize=300%2C300&ssl=1',
    imageAlt: 'Imagen de tornillos de alta resistencia.',
    price: '$35,000 COP',
    color: 'Acero',
    desc: 'Tornillos diseñados para soportar altas cargas. Ideales para patinetas eléctricas y bicicletas. Envíos seguros en toda Colombia.',
    totalUnits: 50,
  },
  {
    id: 2,
    name: 'Timbres para Patinetas',
    href: '#',
    imageSrc:
      'https://i0.wp.com/scooterscolombia.com/wp-content/uploads/2024/11/categoria_timbres.png?resize=300%2C300&ssl=1',
    imageAlt: 'Imagen de timbres para patinetas.',
    price: '$25,000 COP',
    color: 'Negro y Plata',
    desc: 'Timbres elegantes y funcionales para alertar con estilo. Compatibles con diversos modelos de patinetas. Envíos rápidos y confiables.',
    totalUnits: 35,
  },
  {
    id: 3,
    name: 'Llantas para Patinetas',
    href: '#',
    imageSrc:
      'https://i0.wp.com/scooterscolombia.com/wp-content/uploads/2024/10/categoria_llantas_patineta.png?resize=300%2C300&ssl=1',
    imageAlt: 'Imagen de llantas para patinetas.',
    price: '$85,000 COP',
    color: 'Negro',
    desc: 'Llantas de alta durabilidad con excelente tracción. Perfectas para caminos urbanos y terrenos mixtos. Envíos nacionales.',
    totalUnits: 40,
  },
  {
    id: 4,
    name: 'Cargadores para Patinetas',
    href: '#',
    imageSrc:
      'https://i0.wp.com/scooterscolombia.com/wp-content/uploads/2024/11/categoria_cargadores_patineta.png?resize=300%2C300&ssl=1',
    imageAlt: 'Imagen de cargadores para patinetas.',
    price: '$120,000 COP',
    color: 'Negro',
    desc: 'Cargadores originales y compatibles con varios modelos de patinetas eléctricas. Máxima eficiencia energética.',
    totalUnits: 20,
  },
  {
    id: 5,
    name: 'Aceleradores para Patinetas',
    href: '#',
    imageSrc:
      'https://i0.wp.com/scooterscolombia.com/wp-content/uploads/2024/11/categoria_aceleradores.jpg?resize=300%2C300&ssl=1',
    imageAlt: 'Imagen de aceleradores para patinetas.',
    price: '$95,000 COP',
    color: 'Negro',
    desc: 'Aceleradores de respuesta rápida y diseño ergonómico. Compatibles con diferentes marcas de patinetas eléctricas.',
    totalUnits: 60,
  },
  {
    id: 6,
    name: 'Baterías para Patinetas',
    href: '#',
    imageSrc:
      'https://i0.wp.com/scooterscolombia.com/wp-content/uploads/2024/10/categoria_llantas_patineta.png?resize=300%2C300&ssl=1',
    imageAlt: 'Imagen de baterías para patinetas.',
    price: '$150,000 COP',
    color: 'Negro',
    desc: 'Baterías de alta capacidad para patinetas eléctricas, con larga duración y rendimiento optimizado.',
    totalUnits: 25,
  },
  {
    id: 7,
    name: 'Luces LED para Patinetas',
    href: '#',
    imageSrc:
      'https://i0.wp.com/scooterscolombia.com/wp-content/uploads/2024/10/categoria_llantas_patineta.png?resize=300%2C300&ssl=1',
    imageAlt: 'Imagen de luces LED para patinetas.',
    price: '$40,000 COP',
    color: 'Blanco y Rojo',
    desc: 'Luces LED de alta visibilidad para mejorar la seguridad al andar en patineta por la noche.',
    totalUnits: 50,
  },
  {
    id: 8,
    name: 'Manillares para Patinetas',
    href: '#',
    imageSrc:
      'https://i0.wp.com/scooterscolombia.com/wp-content/uploads/2024/10/categoria_llantas_patineta.png?resize=300%2C300&ssl=1',
    imageAlt: 'Imagen de manillares para patinetas.',
    price: '$60,000 COP',
    color: 'Aluminio',
    desc: 'Manillares ergonómicos y resistentes para patinetas eléctricas, fáciles de instalar y con un diseño moderno.',
    totalUnits: 30,
  },
  {
    id: 9,
    name: 'Casco de Seguridad para Patinetas',
    href: '#',
    imageSrc:
      'https://i0.wp.com/scooterscolombia.com/wp-content/uploads/2024/10/categoria_llantas_patineta.png?resize=300%2C300&ssl=1',
    imageAlt: 'Imagen de casco de seguridad para patinetas.',
    price: '$85,000 COP',
    color: 'Negro',
    desc: 'Casco de alta protección con certificación de seguridad, ideal para el uso en patinetas eléctricas.',
    totalUnits: 15,
  },
  {
    id: 10,
    name: 'Frenos para Patinetas',
    href: '#',
    imageSrc:
      'https://i0.wp.com/scooterscolombia.com/wp-content/uploads/2024/10/categoria_llantas_patineta.png?resize=300%2C300&ssl=1',
    imageAlt: 'Imagen de frenos para patinetas.',
    price: '$70,000 COP',
    color: 'Negro',
    desc: 'Frenos de alta calidad para una frenada más eficiente y segura, adecuados para patinetas eléctricas.',
    totalUnits: 45,
  },
];

function AllProducts() {
  const addNewProduct = () => {};

  return (
    <div className="w-full overflow-hidden px-16 mt-16 h-auto mb-40">
      <div className="bg-white">
        <div className="w-full">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            NUESTROS PRODUCTOS
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-6">
            {products.map((product) => (
              <ItemProduct key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
