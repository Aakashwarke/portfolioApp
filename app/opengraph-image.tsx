import { ImageResponse } from 'next/og';
import { personal, seo } from '@/config/site';

export const alt = seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Generated at build time, so there is no static og.png to keep in sync with
 * the content in config/site.ts.
 */
const OpengraphImage = () =>
    new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: '#0a0a0a',
                    padding: '72px',
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{ display: 'flex', color: '#d3fd50', fontSize: 28, letterSpacing: 8 }}>
                    {personal.role.toUpperCase()}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                        style={{
                            display: 'flex',
                            color: '#f5f5f5',
                            fontSize: 128,
                            fontWeight: 700,
                            lineHeight: 1,
                            letterSpacing: -4,
                        }}
                    >
                        {personal.name.toUpperCase()}
                    </div>
                    <div style={{ display: 'flex', marginTop: 28, color: '#888888', fontSize: 30 }}>
                        {personal.tagline.slice(0, 96)}
                    </div>
                </div>

                <div style={{ display: 'flex', height: 8, width: 240, background: '#d3fd50' }} />
            </div>
        ),
        size,
    );

export default OpengraphImage;
