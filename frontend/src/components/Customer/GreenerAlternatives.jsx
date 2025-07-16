import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Grid,
  Box,
} from "@mui/material";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ForestIcon from "@mui/icons-material/Forest"; // ✅ Replacing EcoIcon with ForestIcon
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import InventoryIcon from "@mui/icons-material/Inventory";

const GreenerAlternatives = ({ productId }) => {
  const [alternatives, setAlternatives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlternatives = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/products/${productId}/alternatives`
        );
        setAlternatives(res.data.greenerAlternatives || []);
      } catch (err) {
        console.error("Error fetching alternatives", err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchAlternatives();
  }, [productId]);

  if (loading) return <Typography>Loading alternatives...</Typography>;

  if (alternatives.length === 0)
    return (
      <Typography color="text.secondary">
        No greener alternatives found.
      </Typography>
    );

  return (
    <Box mt={4}>
      <Typography
        variant="h6"
        color="green"
        gutterBottom
        display="flex"
        alignItems="center"
        gap={1}
      >
        <ForestIcon color="success" fontSize="small" /> Greener Alternatives
      </Typography>

      <Grid container spacing={3}>
        {alternatives.map((alt) => (
          <Grid item xs={12} sm={6} md={4} key={alt._id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="180"
                image={alt.imageUrl}
                alt={alt.name}
                sx={{ objectFit: "contain", p: 1 }}
              />
              <CardContent>
                <Typography variant="h6">{alt.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {alt.category}
                </Typography>

                <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                  <Chip
                    label={`Score: ${alt.sustainabilityScore}`}
                    icon={<ThumbUpIcon />}
                    color="success"
                    size="small"
                  />
                  <Chip
                    label={`${alt.transportDistanceKm} km`}
                    icon={<LocalShippingIcon />}
                    size="small"
                  />
                  <Chip
                    label={alt.packagingType}
                    icon={<InventoryIcon />}
                    size="small"
                    color="info"
                  />
                </Box>

                <Typography variant="body2" mt={1}>
                  🌍 Carbon Footprint:{" "}
                  <strong style={{ color: "#e53935" }}>
                    {alt.carbonFootprint} kg CO₂
                  </strong>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GreenerAlternatives;
