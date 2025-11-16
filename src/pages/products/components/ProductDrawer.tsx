import { useRef, useEffect } from 'react';
import { Box, Typography, Drawer, IconButton, CircularProgress, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useProduct } from '../../../hooks/products';
import ErrorAlert from '../../../components/alerts/ErrorAlert';
import { useTypewriterSummary } from '../../../hooks/useTypewriterSummary';

const ProductDrawer = ({ id, onClose }: { id: number | undefined; onClose: () => void }) => {
  const { data, isLoading, error } = useProduct({ id });

  const { text, caret, isTyping, generateSummary } = useTypewriterSummary(id);

  const summaryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (summaryRef.current) {
      summaryRef.current.scrollTop = summaryRef.current.scrollHeight;
    }
  }, [text]);

  return (
    <Drawer
      anchor='right'
      open={!!id}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: drawerWrapperStyle,
        },
      }}
    >
      <Box sx={{ padding: '12px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='body1' sx={{ fontWeight: '600' }}>
            {data?.title ? data?.title : ''}
          </Typography>
          <IconButton onClick={onClose} sx={closeIconStyle}>
            <CloseIcon />
          </IconButton>
        </Box>

        {isLoading && (
          <Box sx={centeredBox}>
            <CircularProgress size={44} />
          </Box>
        )}

        {error ? (
          <Box sx={centeredBox}>
            <ErrorAlert error={error} />
          </Box>
        ) : (
          <>
            <Typography variant='body1' sx={{ mt: 6, mb: 2 }}>
              {data?.description}
            </Typography>

            <Typography variant='body1'>Price: ${data?.price}</Typography>
            <Typography variant='body1'>Rating: {data?.rating}</Typography>

            {data?.tags && data?.tags?.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant='body1'>Tags:</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {data?.tags.map((t: string) => (
                    <Box key={t} sx={dataTagsStyle}>
                      {t}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            <Box sx={{ mt: 5 }}>
              <Typography variant='body1' sx={{ mb: 1 }}>
                AI Summary
              </Typography>

              <Box ref={summaryRef} id='ai-summary-box' sx={aiSummaryBoxStyle}>
                {text}
                <span style={{ opacity: 0.7 }}>{caret}</span>
              </Box>
              <Button
                disabled={isTyping}
                onClick={generateSummary}
                id='generate-summary-btn'
                color='success'
                size='medium'
                variant='contained'
                sx={{
                  mt: 2,
                  '&.Mui-disabled': {
                    color: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                {isTyping ? 'Generating...' : 'Generate Summary'}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default ProductDrawer;

const centeredBox = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '100px',
};

const aiSummaryBoxStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  whiteSpace: 'pre-wrap',
  fontFamily: 'monospace',
  minHeight: '260px',
  maxHeight: '260px',
  overflow: 'auto',
  color: 'var(--color-white)',
  fontSize: '16px',
};

const dataTagsStyle = {
  padding: '4px 8px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: 'var(--color-white)',
  borderRadius: '8px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
};

const drawerWrapperStyle = {
  backgroundColor: 'var(--color-black)',
  padding: 0,
  width: {
    xs: '100%',
    sm: 600,
  },
};

const closeIconStyle = {
  position: 'relative',
  color: 'var(--color-white)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
};
