"""create_model_version_table

Revision ID: a9bbeb2fcf63
Revises: 1f4a3eee3c90
Create Date: 2025-05-22 10:47:20.886684

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a9bbeb2fcf63'
down_revision: Union[str, None] = '1f4a3eee3c90'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() :
    op.create_table(
        'model_version',
        sa.Column('id', sa.Integer(), nullable=False,primary_key=True),
        sa.Column('model_file_name', sa.String(), nullable=False),
        sa.Column('dataset_file_name', sa.String(), nullable=False),
        sa.Column('version', sa.String(length=255), nullable=False),
        sa.Column('accuracy', sa.Float(), nullable=False),
        sa.Column('status', sa.Enum('current','old', name='model_status'), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
    )
    


def downgrade() :
    op.drop_table('model_version')
