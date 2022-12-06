# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_12_02_152118) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "conferences", force: :cascade do |t|
    t.string "name"
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "fields", force: :cascade do |t|
    t.string "field_name"
    t.string "team_name"
    t.integer "visit"
    t.string "field_image"
    t.string "team_image"
    t.bigint "user_id", null: false
    t.bigint "conference_id", null: false
    t.bigint "rivalry_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["conference_id"], name: "index_fields_on_conference_id"
    t.index ["rivalry_id"], name: "index_fields_on_rivalry_id"
    t.index ["user_id"], name: "index_fields_on_user_id"
  end

  create_table "rivalries", force: :cascade do |t|
    t.string "rival_team"
    t.string "rival_logo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_fields", force: :cascade do |t|
    t.integer "user_id"
    t.integer "field_id"
    t.boolean "visited"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "fields", "conferences"
  add_foreign_key "fields", "rivalries"
  add_foreign_key "fields", "users"
end
