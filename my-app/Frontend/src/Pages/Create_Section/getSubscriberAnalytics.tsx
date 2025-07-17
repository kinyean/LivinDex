export const getSubscriberAnalytics = async (creatorId: string) => {
    console.log("🎯 Creator ID used for fetch:", creatorId); 
  
    const res = await fetch(`http://localhost:3001/api/analytics/subscribers/${creatorId}`);
    if (!res.ok) throw new Error("Failed to fetch subscriber data");
    return res.json();
  };
  