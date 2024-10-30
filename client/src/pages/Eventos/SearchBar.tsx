import React from 'react';

interface SearchBarProps {
  eventType: string;
  setEventType: (value: string) => void;
  eventTime: string;
  setEventTime: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  eventType,
  setEventType,
  eventTime,
  setEventTime,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const eventTypes = [
    { label: 'Palestra', value: 'palestra' },
    { label: 'Competição', value: 'competicao' },
    { label: 'Festa', value: 'festa' },
    { label: 'Evento de Empresa', value: 'evento_empresa' },
    { label: 'Workshop', value: 'workshop' },
    { label: 'Seminário', value: 'seminario' },
  ];

  const timeRanges = [
    { label: 'Manhã (08:00 - 12:00)', value: 'morning' },
    { label: 'Tarde (12:00 - 18:00)', value: 'afternoon' },
    { label: 'Noite (18:00 - 23:00)', value: 'evening' },
  ];

  return (
    <div className="search-bar">
      {/* Tipo de evento */}
      <div className="input-group">
        <label>Tipo de evento</label>
        <select 
          value={eventType} 
          onChange={(e) => setEventType(e.target.value)}
        >
          <option value="">Selecione um tipo</option>
          {eventTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Horário */}
      <div className="input-group">
        <label>Horário</label>
        <select 
          value={eventTime} 
          onChange={(e) => {setEventTime(e.target.value);
            console.log("Horário selecionado:", e.target.value);
          }
          }
        >
          <option value="">Selecione um horário</option>
          {timeRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* Data */}
      <div className="input-group">
        <label>Data</label>
        <div className="date-range">
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
          />
          <span>À</span>
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
          />
        </div>
      </div>

      {/* Botão de busca */}
      <button className="search-button">+ Adicionar Evento</button>
    </div>
  );
};

export default SearchBar;