import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const columns = [
  { id: 'pending', title: 'En attente', color: 'bg-[#FFF9C4]' },
  { id: 'scheduled', title: 'Planifié', color: 'bg-[#BBDEFB]' },
  { id: 'completed', title: 'Terminé', color: 'bg-[#C8E6C9]' }
];

// Mock data pour la démonstration
const mockAppointments = {
  pending: [
    {
      id: '1',
      client: 'Jean Dupont',
      patient: 'Spirit',
      type: 'Examen annuel',
      date: null,
      time: null,
      createdAt: '2024-03-20'
    }
  ],
  scheduled: [
    {
      id: '2',
      client: 'Marie Martin',
      patient: 'Luna',
      type: 'Contrôle',
      date: '2024-03-20',
      time: '15:30',
      createdAt: '2024-03-19'
    }
  ],
  completed: [
    {
      id: '3',
      client: 'Pierre Dubois',
      patient: 'Éclair',
      type: 'Vaccination',
      date: '2024-03-18',
      time: '10:00',
      completedAt: '2024-03-18'
    }
  ]
};

export function AppointmentKanban() {
  const handleDragEnd = (result) => {
    // Logique de déplacement à implémenter
    console.log('Déplacement:', result);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-4 h-[calc(100vh-300px)]">
          {columns.map((column) => (
            <div
              key={column.id}
              className={`${column.color} rounded-lg p-4 flex flex-col`}
            >
              <h3 className="font-semibold text-gray-700 mb-4 flex items-center justify-between">
                {column.title}
                <span className="bg-white px-2 py-1 rounded text-sm">
                  {mockAppointments[column.id]?.length || 0}
                </span>
              </h3>

              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex-1 overflow-y-auto space-y-3"
                  >
                    {mockAppointments[column.id]?.map((appointment, index) => (
                      <Draggable
                        key={appointment.id}
                        draggableId={appointment.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white rounded-lg shadow p-4"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-900">
                                {appointment.client}
                              </span>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                column.id === 'pending' ? 'bg-[#FFF59D] text-[#F57F17]' :
                                column.id === 'scheduled' ? 'bg-[#90CAF9] text-[#1565C0]' :
                                'bg-[#A5D6A7] text-[#2E7D32]'
                              }`}>
                                {column.title}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {appointment.patient} - {appointment.type}
                            </p>
                            <div className="flex items-center text-sm text-gray-500">
                              {appointment.date && appointment.time ? (
                                <>
                                  <Clock size={14} className="mr-1" />
                                  {appointment.time}
                                  <Calendar size={14} className="ml-2 mr-1" />
                                  {appointment.date}
                                </>
                              ) : (
                                <span className="text-yellow-600">
                                  En attente de planification
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}