const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
    title: { type: String, 
        required: true },

    description: { type: String,
         required: true 
        },
        
    location: { type: String, 
        required: true 
    },

    status: { type: String,
         enum: ['reported', 'in-progress', 'resolved'],
          default: 'reported' 
        },

    reportedBy: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
         required: false 
        },

    responders: [{ type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' }],
    createdAt: { type: Date,
         default: Date.now
         },
});

const Incident = mongoose.model('Incident', IncidentSchema);
module.exports = Incident;
