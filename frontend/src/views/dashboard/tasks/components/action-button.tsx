import clsx from 'clsx'

interface ActionButtonProps {
  label: string
  onClick?: () => void
  icon?: string
  disabled?: boolean
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  icon = 'ri-play-fill',
  disabled = false,
}) => {
  return (
    <button
      className={clsx(
        'bg-accent text-text-reverse border-none px-12 py-5 text-xl font-bold',
        'flex items-center gap-3 transition-all duration-300',
        disabled
          ? 'cursor-not-allowed opacity-50'
          : 'cursor-pointer hover:scale-105 active:scale-95',
      )}
      style={{
        borderRadius: '16px',
        boxShadow: '0 6px 24px rgba(254, 250, 83, 0.25), 0 2px 8px rgba(254, 250, 83, 0.15)',
        background: 'linear-gradient(135deg, #FEFA53 0%, #F5E642 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(254, 250, 83, 0.35), 0 4px 12px rgba(254, 250, 83, 0.2)'
          e.currentTarget.style.background = 'linear-gradient(135deg, #FFF966 0%, #FEFA53 100%)'
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(254, 250, 83, 0.25), 0 2px 8px rgba(254, 250, 83, 0.15)'
          e.currentTarget.style.background = 'linear-gradient(135deg, #FEFA53 0%, #F5E642 100%)'
        }
      }}
    >
      <i className={`${icon} text-2xl`} style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))' }} />
      <span style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>{label}</span>
    </button>
  )
}
