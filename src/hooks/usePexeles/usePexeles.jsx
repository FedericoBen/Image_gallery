import { createClient } from "pexels";
import { useEffect, useState } from "react";

const client = createClient(import.meta.env.VITE_PEXELES_KEY);
const query = "Nature";

const usePexeles = () => {
  const [infoService, setInfoService] = useState({
    data: null,
    error: null,
    loading: false,
  });

  const callPexeles = async () => {
    try {
      setInfoService({
        ...infoService,
        loading: true,
      });
      const { photos } = await client.photos.search({
        query,
        per_page: 15,
        page: 1,
      });
      setInfoService({
        data: [...photos] || [],
        loading: false,
        error: null,
      });
    } catch (error) {
      setInfoService({
        data: null,
        loading: false,
        error,
      });
    }
  };

  useEffect(() => {
    callPexeles();
  }, []);
  
  return { ...infoService };
};

export default usePexeles;
