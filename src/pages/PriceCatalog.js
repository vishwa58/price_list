// src/pages/PriceCatalog.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pricingData from '../data/mvp_pricing_set.json';
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import { Autocomplete, TextField } from '@mui/material';

function PriceCatalog() {
  const [btcPrice, setBtcPrice] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Fetch current Bitcoin price in USD
    axios
      .get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: 'bitcoin',
          vs_currencies: 'usd',
        },
      })
      .then((response) => {
        setBtcPrice(response.data.bitcoin.usd);
      })
      .catch((error) => {
        console.error('Error fetching BTC price:', error);
      });
  }, []);

  // Flatten the items into a single array with category references
  const allItems = pricingData.flatMap((category) =>
    category.items.map((item) => ({
      ...item,
      category: category.category,
    }))
  );

  const btcFormatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    maximumFractionDigits: 8,
  });

  if (!btcPrice) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Price Catalog in Bitcoin
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Discover everyday item prices in Bitcoin.
      </Typography>
      <Autocomplete
        options={allItems}
        groupBy={(option) => option.category}
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => setSelectedItem(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select an item..."
            variant="outlined"
            fullWidth
            sx={{ mb: 4 }}
          />
        )}
      />
      {selectedItem && (
        <Card variant="outlined" sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5">{selectedItem.name}</Typography>
            <Typography color="text.secondary">
              ₿ {btcFormatter.format(selectedItem.price_usd / btcPrice)}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default PriceCatalog;
