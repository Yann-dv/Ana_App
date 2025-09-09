// Static params generation for programs
export async function generateStaticParams() {
  // Define the program IDs that should be statically generated
  const programIds = [
    'yoga-basics',
    'hiit-cardio', 
    'pilates-core',
    'strength-training',
    'meditation-mindfulness',
    'dance-fitness'
  ];
  
  return programIds.map((id) => ({
    id: id,
  }));
}