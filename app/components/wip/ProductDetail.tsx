// components/ProductDetail.tsx
import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion } from 'framer-motion';

const products = [
  {
    id: 'automation-kit',
    title: 'Automation Kit',
    description: 'Streamline workflows effortlessly with our comprehensive Automation Kit.',
    image: '/images/automation.jpg',
    previewUrl: 'https://www.youtube.com/embed/preview1',
  },
  {
    id: 'cad-integration',
    title: 'CAD Integration Pack',
    description: 'Seamlessly integrate CAD with .NET to enhance your project efficiency.',
    image: '/images/cad.jpg',
    previewUrl: 'https://www.youtube.com/embed/preview2',
  },
  {
    id: 'erp-automation',
    title: 'ERP Automation Suite',
    description: 'Rapidly automate your ERP processes for better accuracy and speed.',
    image: '/images/erp.jpg',
    previewUrl: 'https://www.youtube.com/embed/preview3',
  },
];

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const product = products.find((p) => p.id === id);

  if (!product) return <div className="p-6">Product not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6"
    >
      <Image
        src={product.image}
        alt={product.title}
        width={800}
        height={450}
        className="rounded-xl"
      />
      <h1 className="text-3xl font-bold mt-4 text-gray-800">{product.title}</h1>
      <p className="mt-2 text-gray-600">{product.description}</p>
      <div className="mt-6">
        <iframe
          width="100%"
          height="400"
          src={product.previewUrl}
          title="YouTube preview"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-xl"
        ></iframe>
      </div>
      <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
        Purchase
      </button>
    </motion.div>
  );
}
