import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(url, key);
interface Props {
  dc: string;
  day: number;
  meal: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { dc, date, meal } = req.body;
	//console.log(dc)

    // Check if required parameters are provided
    /*if (!dc) {
      throw new Error('Missing required parameters');
    }*/

	try{
	  //res.status(200).json({name: 'jo'})
    // Fetch data from Supabase table
    const { data, error } = await supabase.from('food_items').select('*').eq("dc", dc).eq("meal", meal).eq("date", date);

    if (error) {
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

